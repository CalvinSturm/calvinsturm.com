import { bodyObject, dbInsert, dbUpdate, deviceBySecret, isExpired, issueSnapshot, isoNow, json, randomToken, refreshExpiry, requirePost, tokenHash } from '../_lib/service.js';

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  try {
    const body = bodyObject(req);
    const deviceCode = String(body.device_code || '');
    if (deviceCode.length < 32 || deviceCode.length > 200) return json(res, 400, { error: 'Invalid device code.' });
    const device = await deviceBySecret(deviceCode);
    if (!device || isExpired(device.expires_at)) return json(res, 410, { error: 'Device authorization expired.' });
    if (device.status === 'pending') {
      await dbUpdate('fastmedia_device_codes', { id: `eq.${device.id}` }, { poll_count: Number(device.poll_count || 0) + 1, last_poll_at: isoNow() });
      return json(res, 202, { status: 'authorization_pending' });
    }
    if (device.status !== 'approved' || !device.account_id) return json(res, 409, { error: 'Device authorization was already consumed.' });

    const consumed = await dbUpdate('fastmedia_device_codes', { id: `eq.${device.id}`, status: 'eq.approved' }, { status: 'consumed', consumed_at: isoNow() });
    if (!consumed.length) return json(res, 409, { error: 'Device authorization was already consumed.' });
    const refreshToken = randomToken(48);
    await dbInsert('fastmedia_refresh_tokens', {
      account_id: device.account_id, token_hash: tokenHash(refreshToken), expires_at: refreshExpiry(),
    });
    const entitlementSnapshot = await issueSnapshot(device.account_id);
    json(res, 200, { account_id: device.account_id, refresh_token: refreshToken, entitlement_snapshot: entitlementSnapshot });
  } catch (error) {
    console.error('device/token', error);
    json(res, 500, { error: 'Could not complete device sign-in.' });
  }
}

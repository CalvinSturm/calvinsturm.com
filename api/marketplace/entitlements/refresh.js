import { bodyObject, dbSelect, isExpired, issueSnapshot, json, requirePost, tokenHash } from '../_lib/service.js';

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  try {
    const token = String(bodyObject(req).refresh_token || '');
    if (token.length < 32 || token.length > 300) return json(res, 401, { error: 'Invalid marketplace session.' });
    const rows = await dbSelect('fastmedia_refresh_tokens', new URLSearchParams({ select: 'id,account_id,expires_at,revoked_at', token_hash: `eq.${tokenHash(token)}`, limit: '1' }).toString());
    const session = rows[0];
    if (!session || session.revoked_at || isExpired(session.expires_at)) return json(res, 401, { error: 'Marketplace session expired. Sign in again.' });
    const entitlementSnapshot = await issueSnapshot(session.account_id);
    json(res, 200, { account_id: session.account_id, entitlement_snapshot: entitlementSnapshot });
  } catch (error) {
    console.error('entitlements/refresh', error);
    json(res, 500, { error: 'Could not refresh marketplace ownership.' });
  }
}

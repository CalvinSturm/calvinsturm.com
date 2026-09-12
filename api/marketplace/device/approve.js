import { accountByEmail, bodyObject, dbInsert, dbUpdate, isExpired, isoNow, json, normalizeEmail, passwordRecord, pendingDeviceByUserCode, requirePost, validatePassword, verifyPassword } from '../_lib/service.js';

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  try {
    const body = bodyObject(req);
    const mode = body.mode === 'register' ? 'register' : 'login';
    const userCode = String(body.user_code || '').trim().toUpperCase();
    if (!/^[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(userCode)) return json(res, 400, { error: 'Invalid device code.' });
    const email = normalizeEmail(body.email);
    const password = validatePassword(body.password);
    const device = await pendingDeviceByUserCode(userCode);
    if (!device || device.status !== 'pending' || isExpired(device.expires_at)) return json(res, 410, { error: 'This device code is invalid or expired.' });

    let account = await accountByEmail(email);
    if (mode === 'register') {
      if (account) return json(res, 409, { error: 'An account already exists for this email. Choose Sign in.' });
      const displayName = String(body.display_name || '').trim().slice(0, 120);
      const record = passwordRecord(password);
      account = await dbInsert('fastmedia_accounts', {
        email, display_name: displayName, password_salt: record.salt, password_hash: record.hash,
      });
    } else {
      if (!account || !verifyPassword(password, account.password_salt, account.password_hash)) return json(res, 401, { error: 'Email or password is incorrect.' });
    }

    const changed = await dbUpdate('fastmedia_device_codes', { id: `eq.${device.id}`, status: 'eq.pending' }, {
      status: 'approved', account_id: account.id, approved_at: isoNow(),
    });
    if (!changed.length) return json(res, 409, { error: 'This device sign-in was already used.' });
    json(res, 200, { ok: true, account: { email: account.email, display_name: account.display_name || '' } });
  } catch (error) {
    console.error('device/approve', error);
    json(res, 500, { error: error.message || 'Could not approve device sign-in.' });
  }
}

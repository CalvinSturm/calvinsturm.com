import { bodyObject, dbUpdate, isoNow, json, requirePost, tokenHash } from '../_lib/service.js';

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  const token = String(bodyObject(req).refresh_token || '');
  if (token.length >= 32 && token.length <= 300) {
    try { await dbUpdate('fastmedia_refresh_tokens', { token_hash: `eq.${tokenHash(token)}`, revoked_at: 'is.null' }, { revoked_at: isoNow() }); }
    catch (error) { console.error('session/revoke', error); }
  }
  json(res, 200, { ok: true });
}

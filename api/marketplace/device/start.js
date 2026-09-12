import { bodyObject, dbInsert, deviceExpiry, deviceTtlSeconds, json, makeUserCode, randomToken, requirePost, tokenHash } from '../_lib/service.js';

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  bodyObject(req);
  try {
    const deviceCode = randomToken(32);
    let userCode = makeUserCode();
    let created = null;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      try {
        created = await dbInsert('fastmedia_device_codes', {
          device_code_hash: tokenHash(deviceCode), user_code: userCode, status: 'pending', expires_at: deviceExpiry(), poll_count: 0,
        });
        break;
      } catch (error) {
        if (attempt === 3) throw error;
        userCode = makeUserCode();
      }
    }
    if (!created) throw new Error('Could not create device authorization.');
    const origin = process.env.FASTMEDIA_ACCOUNT_WEB_ORIGIN || `https://${req.headers.host || 'calvinsturm.com'}`;
    json(res, 200, {
      device_code: deviceCode,
      user_code: userCode,
      verification_uri: `${origin.replace(/\/$/, '')}/fastmedia-account.html?code=${encodeURIComponent(userCode)}`,
      expires_in: deviceTtlSeconds(),
      interval: 2,
    });
  } catch (error) {
    console.error('device/start', error);
    json(res, 503, { error: 'FastMedia account service is not fully provisioned yet.' });
  }
}

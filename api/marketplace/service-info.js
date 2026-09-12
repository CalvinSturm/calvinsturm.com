import { json, serviceConfigured, servicePublicKeyB64 } from './_lib/service.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed.' });
  try {
    json(res, 200, {
      service: 'FastMedia Marketplace Account Service',
      version: 1,
      configured: serviceConfigured(),
      key_id: process.env.FASTMEDIA_ENTITLEMENT_KEY_ID || '',
      public_key: process.env.FASTMEDIA_ENTITLEMENT_PRIVATE_KEY_B64 ? servicePublicKeyB64() : '',
    });
  } catch (error) {
    json(res, 503, { service: 'FastMedia Marketplace Account Service', version: 1, configured: false });
  }
}

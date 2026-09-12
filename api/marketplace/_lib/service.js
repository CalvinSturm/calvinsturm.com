import crypto from 'node:crypto';

const DEVICE_TTL_SECONDS = 600;
const SNAPSHOT_TTL_SECONDS = 86400;
const REFRESH_TTL_DAYS = 90;
const USER_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.json(body);
}

export function requirePost(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    json(res, 405, { error: 'Method not allowed.' });
    return false;
  }
  return true;
}

export function bodyObject(req) {
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) return req.body;
  if (typeof req.body === 'string') {
    try { const value = JSON.parse(req.body); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
    catch { return {}; }
  }
  return {};
}

export function normalizeEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  if (email.length < 5 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Enter a valid email address.');
  }
  return email;
}

export function validatePassword(value) {
  const password = String(value || '');
  if (password.length < 10 || password.length > 200) throw new Error('Password must be 10 to 200 characters.');
  return password;
}

export function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('base64url');
}

export function tokenHash(token) {
  return crypto.createHash('sha256').update(String(token), 'utf8').digest('hex');
}

export function makeUserCode() {
  let out = '';
  for (let i = 0; i < 8; i += 1) out += USER_CODE_ALPHABET[crypto.randomInt(0, USER_CODE_ALPHABET.length)];
  return `${out.slice(0, 4)}-${out.slice(4)}`;
}

export function passwordRecord(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return { salt: salt.toString('base64'), hash: hash.toString('base64') };
}

export function verifyPassword(password, saltB64, hashB64) {
  try {
    const salt = Buffer.from(saltB64, 'base64');
    const expected = Buffer.from(hashB64, 'base64');
    const actual = crypto.scryptSync(password, salt, expected.length, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
    return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

function env(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Server configuration missing ${name}.`);
  return value;
}

export function serviceConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.FASTMEDIA_ENTITLEMENT_PRIVATE_KEY_B64 && process.env.FASTMEDIA_ENTITLEMENT_KEY_ID);
}

function supabaseHeaders(extra = {}) {
  const key = env('SUPABASE_SERVICE_ROLE_KEY');
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...extra,
  };
}

export async function dbSelect(table, query = '') {
  const url = `${env('SUPABASE_URL').replace(/\/$/, '')}/rest/v1/${table}?${query}`;
  const response = await fetch(url, { headers: supabaseHeaders(), cache: 'no-store' });
  if (!response.ok) throw new Error(`Database select failed (${response.status}).`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

export async function dbInsert(table, row) {
  const url = `${env('SUPABASE_URL').replace(/\/$/, '')}/rest/v1/${table}`;
  const response = await fetch(url, {
    method: 'POST', headers: supabaseHeaders({ Prefer: 'return=representation' }), body: JSON.stringify(row), cache: 'no-store',
  });
  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`Database insert failed (${response.status}).`);
    error.detail = text;
    throw error;
  }
  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] : null;
}

export async function dbUpdate(table, filters, patch) {
  const query = new URLSearchParams(filters).toString();
  const url = `${env('SUPABASE_URL').replace(/\/$/, '')}/rest/v1/${table}?${query}`;
  const response = await fetch(url, {
    method: 'PATCH', headers: supabaseHeaders({ Prefer: 'return=representation' }), body: JSON.stringify(patch), cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Database update failed (${response.status}).`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

export function isoNow() { return new Date().toISOString(); }
export function isoAfterSeconds(seconds) { return new Date(Date.now() + seconds * 1000).toISOString(); }
export function deviceExpiry() { return isoAfterSeconds(DEVICE_TTL_SECONDS); }
export function refreshExpiry() { return new Date(Date.now() + REFRESH_TTL_DAYS * 86400 * 1000).toISOString(); }
export function deviceTtlSeconds() { return DEVICE_TTL_SECONDS; }

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function privateKeyFromSeed(seedB64) {
  const seed = Buffer.from(seedB64, 'base64');
  if (seed.length !== 32) throw new Error('FASTMEDIA_ENTITLEMENT_PRIVATE_KEY_B64 must decode to a 32-byte Ed25519 seed.');
  const prefix = Buffer.from('302e020100300506032b657004220420', 'hex');
  return crypto.createPrivateKey({ key: Buffer.concat([prefix, seed]), format: 'der', type: 'pkcs8' });
}

export function servicePublicKeyB64() {
  const privateKey = privateKeyFromSeed(env('FASTMEDIA_ENTITLEMENT_PRIVATE_KEY_B64'));
  const der = crypto.createPublicKey(privateKey).export({ format: 'der', type: 'spki' });
  return Buffer.from(der).subarray(-32).toString('base64');
}

export async function issueSnapshot(accountId) {
  const accountRows = await dbSelect('fastmedia_accounts', new URLSearchParams({ select: 'id,email,display_name', id: `eq.${accountId}`, limit: '1' }).toString());
  if (!accountRows[0]) throw new Error('Account not found.');
  const account = accountRows[0];
  const entitlements = await dbSelect('fastmedia_entitlements', new URLSearchParams({
    select: 'id,entitlement_key,status,granted_at,source', account_id: `eq.${accountId}`, order: 'granted_at.asc', limit: '2000',
  }).toString());
  const issuedAt = isoNow();
  const payload = {
    account: { account_id: account.id, email: account.email || '', display_name: account.display_name || '' },
    issued_at: issuedAt,
    expires_at: isoAfterSeconds(SNAPSHOT_TTL_SECONDS),
    entitlements: entitlements.map((item) => ({
      entitlement_id: item.id,
      entitlement_key: item.entitlement_key,
      status: item.status,
      granted_at: item.granted_at || '',
      source: item.source || '',
    })),
  };
  const privateKey = privateKeyFromSeed(env('FASTMEDIA_ENTITLEMENT_PRIVATE_KEY_B64'));
  const signature = crypto.sign(null, Buffer.from(stable(payload), 'utf8'), privateKey).toString('base64');
  return { schema_version: 1, algorithm: 'Ed25519', key_id: env('FASTMEDIA_ENTITLEMENT_KEY_ID'), payload, signature };
}

export async function accountByEmail(email) {
  const rows = await dbSelect('fastmedia_accounts', new URLSearchParams({ select: 'id,email,display_name,password_salt,password_hash', email: `eq.${email}`, limit: '1' }).toString());
  return rows[0] || null;
}

export async function pendingDeviceByUserCode(userCode) {
  const rows = await dbSelect('fastmedia_device_codes', new URLSearchParams({ select: '*', user_code: `eq.${userCode}`, limit: '1' }).toString());
  return rows[0] || null;
}

export async function deviceBySecret(deviceCode) {
  const rows = await dbSelect('fastmedia_device_codes', new URLSearchParams({ select: '*', device_code_hash: `eq.${tokenHash(deviceCode)}`, limit: '1' }).toString());
  return rows[0] || null;
}

export function isExpired(timestamp) { return !timestamp || new Date(timestamp).getTime() <= Date.now(); }

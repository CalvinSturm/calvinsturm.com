# FastMedia production account service

The account service is a Vercel API + Supabase Postgres boundary. The desktop app never receives a user's password.

## Required Vercel environment variables

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FASTMEDIA_ENTITLEMENT_KEY_ID=fm-prod-2026-09`
- `FASTMEDIA_ENTITLEMENT_PRIVATE_KEY_B64=<32-byte Ed25519 seed, base64>`
- optional `FASTMEDIA_ACCOUNT_WEB_ORIGIN=https://calvinsturm.com`

The Ed25519 private seed must exist only in the production secret store. FastMedia ships only the matching public key.

## Device sign-in

1. FastMedia calls `POST /api/marketplace/device/start`.
2. The service returns an opaque device secret, a short user code, and the HTTPS browser URL.
3. The user signs in or creates an account in the browser. The browser sends the password directly to the service.
4. FastMedia polls `POST /api/marketplace/device/token` with only the opaque device secret.
5. After approval, the service returns an opaque refresh token plus an Ed25519-signed entitlement snapshot.
6. FastMedia verifies the signature against its pinned production public key before saving ownership.
7. `POST /api/marketplace/entitlements/refresh` refreshes ownership without collecting the password again.

## Password storage

Passwords are scrypt-hashed server-side with a random per-account salt. Plaintext passwords are never written to Postgres or returned to FastMedia.

## Database

Run `docs/fastmedia-account-service.sql` in the production Supabase project. RLS is enabled and there are intentionally no public policies. Vercel functions access the database with the service-role secret.

## Proving an entitlement before checkout

After a test account signs in, grant a test entitlement directly in SQL:

```sql
insert into public.fastmedia_entitlements(account_id, entitlement_key, source)
select id, 'skin:sturmtechnologies.sturm-forge', 'production-smoke'
from public.fastmedia_accounts
where email = lower('YOUR_EMAIL@example.com')
on conflict (account_id, entitlement_key)
do update set status='active', source='production-smoke', granted_at=now();
```

Then set the marketplace access policy for the test skin to require that exact entitlement, refresh the account in FastMedia, and confirm the gallery changes from `OWNERSHIP REQUIRED` to `OWNED` and allows installation.

Do not add checkout until this production flow has been verified.

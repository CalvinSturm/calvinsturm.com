-- FastMedia Marketplace Account Service v1
-- Run in the production Supabase SQL editor. Vercel accesses these tables only
-- with the service-role key. RLS is enabled and no public policies are created.
create extension if not exists pgcrypto;

create table if not exists public.fastmedia_accounts (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(email)),
  display_name text not null default '',
  password_salt text not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.fastmedia_entitlements (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.fastmedia_accounts(id) on delete cascade,
  entitlement_key text not null,
  status text not null default 'active' check (status in ('active','revoked')),
  source text not null default 'admin',
  granted_at timestamptz not null default now(),
  unique(account_id, entitlement_key)
);

create table if not exists public.fastmedia_device_codes (
  id uuid primary key default gen_random_uuid(),
  device_code_hash text not null unique,
  user_code text not null unique,
  status text not null default 'pending' check (status in ('pending','approved','consumed')),
  account_id uuid references public.fastmedia_accounts(id) on delete cascade,
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  consumed_at timestamptz,
  expires_at timestamptz not null,
  poll_count integer not null default 0,
  last_poll_at timestamptz
);

create table if not exists public.fastmedia_refresh_tokens (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.fastmedia_accounts(id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);

create index if not exists fastmedia_entitlements_account_idx on public.fastmedia_entitlements(account_id);
create index if not exists fastmedia_device_codes_expires_idx on public.fastmedia_device_codes(expires_at);
create index if not exists fastmedia_refresh_tokens_account_idx on public.fastmedia_refresh_tokens(account_id);

alter table public.fastmedia_accounts enable row level security;
alter table public.fastmedia_entitlements enable row level security;
alter table public.fastmedia_device_codes enable row level security;
alter table public.fastmedia_refresh_tokens enable row level security;

-- No anon/authenticated RLS policies by design. Only the Vercel server-side
-- service-role credential may read/write these tables.

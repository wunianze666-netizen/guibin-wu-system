create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Allow public read site content" on public.site_content;
create policy "Allow public read site content"
on public.site_content
for select
to anon, authenticated
using (true);

grant select on table public.site_content to anon, authenticated;
grant select, insert, update on table public.site_content to service_role;

insert into public.site_content (id, content)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

# Deployment Notes

## Supabase

Run `supabase/site-content.sql` in the Supabase SQL editor before enabling cloud edits.

Use these EdgeOne environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL=https://rovfalhqmmdyuffpofmz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_CsQ6jvBtf8p8--RFZLQTAQ_c-4iASxM
SUPABASE_SECRET_KEY=<your Supabase sb_secret key>
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<a private admin password>
```

Only the two `NEXT_PUBLIC_` values are safe to expose in browser code. Keep `SUPABASE_SECRET_KEY` and `ADMIN_PASSWORD` only in EdgeOne environment variables.

## EdgeOne

Use the GitHub `main` branch.

```text
Framework preset: Next
Root directory: ./
Install command: npm install
Build command: npm run build
Output directory: .next
```

The admin page is available at `/admin/login` under the deployed domain.

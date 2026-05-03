# Deployment Notes

## Supabase

Run `supabase/site-content.sql` in the Supabase SQL editor before enabling cloud edits.

Use these EdgeOne environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your Supabase publishable key>
SUPABASE_SECRET_KEY=<your Supabase sb_secret key>
ADMIN_EMAIL=<your admin email>
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

## Custom Domain

After the project is deployed, add a custom domain in EdgeOne Pages. Configure the CNAME record at your DNS provider using the target shown by EdgeOne, then enable the free HTTPS certificate after the CNAME is active.

# Personal Homepage CMS

A Next.js personal homepage with a lightweight admin panel. The public pages show profile, projects, works, internships, certificates, resume, posts, and messages. The admin pages can edit content and save it to Supabase, so updates are visible on the deployed site without rebuilding.

## Features

- Public personal homepage and section pages
- Password-protected admin panel at `/admin/login`
- Editable site copy, profile, projects, works, internships, certificates, resume, posts, and messages
- Local preview while editing
- Cloud persistence through Supabase REST
- Deployable as a Next.js full-stack app on EdgeOne Pages

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- Supabase Postgres
- EdgeOne Pages

## Local Development

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Fill in the values in `.env.local`, then run:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Admin panel:

```text
http://localhost:3000/admin/login
```

## Environment Variables

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SECRET_KEY=your-supabase-secret-key
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=change-this-before-deploying
```

Only the `NEXT_PUBLIC_` values are intended for browser-side use. Keep `SUPABASE_SECRET_KEY` and `ADMIN_PASSWORD` in local environment files or deployment environment variables only.

## Supabase Setup

Run the SQL in [supabase/site-content.sql](supabase/site-content.sql) in your Supabase SQL editor. It creates the `site_content` table, enables RLS, allows public reads, and grants the service role write access for admin saves.

## Deployment

Use a platform that supports Next.js server routes. For EdgeOne Pages:

```text
Framework preset: Next
Root directory: ./
Install command: npm install
Build command: npm run build
Output directory: .next
```

Add the environment variables listed above in the deployment platform. After deployment, bind a custom domain and enable HTTPS.

## Notes

- Admin credentials are read from deployment environment variables.
- Editing content in the admin panel saves to Supabase; code/layout changes still require a Git push and redeploy.
- Do not commit real `.env` files, service keys, admin passwords, or deployment tokens.

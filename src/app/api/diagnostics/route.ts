import { NextResponse } from "next/server";

function hasValue(name: string) {
  return Boolean(process.env[name]);
}

export async function GET() {
  return NextResponse.json({
    env: {
      NEXT_PUBLIC_SUPABASE_URL: hasValue("NEXT_PUBLIC_SUPABASE_URL"),
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: hasValue("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
      ADMIN_EMAIL: hasValue("ADMIN_EMAIL"),
      ADMIN_PASSWORD: hasValue("ADMIN_PASSWORD"),
      SUPABASE_SECRET_KEY: hasValue("SUPABASE_SECRET_KEY"),
      SUPABASE_SERVICE_ROLE_KEY: hasValue("SUPABASE_SERVICE_ROLE_KEY"),
    },
  });
}

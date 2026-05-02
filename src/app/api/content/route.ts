import { NextResponse } from "next/server";
import { defaultContent } from "@/lib/content-data";
import { fetchSiteContent, saveSiteContent } from "@/lib/supabase-rest";

function isAuthorized(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const password = request.headers.get("x-admin-password");
  return password === adminPassword;
}

export async function GET() {
  try {
    const content = await fetchSiteContent();
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { content: defaultContent, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 200 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { content?: typeof defaultContent };
    if (!body.content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }

    await saveSiteContent(body.content);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown save error" },
      { status: 500 },
    );
  }
}

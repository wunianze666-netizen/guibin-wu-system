import { mergeContent } from "@/lib/content-utils";
import { defaultContent, type SiteContent } from "@/lib/content-data";

const CONTENT_ID = "main";

function createSupabaseHeaders(key: string) {
  const headers: Record<string, string> = {
    apikey: key,
  };

  if (!key.startsWith("sb_")) {
    headers.Authorization = `Bearer ${key}`;
  }

  return headers;
}

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url) return null;
  return { url, publishableKey };
}

function getAdminKey() {
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export function hasSupabaseConfig() {
  return Boolean(getSupabaseConfig());
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const config = getSupabaseConfig();
  if (!config) return defaultContent;
  const serverKey = getAdminKey();
  const readKey = serverKey || config.publishableKey;

  if (!readKey) return defaultContent;

  const response = await fetch(
    `${config.url}/rest/v1/site_content?id=eq.${CONTENT_ID}&select=content`,
    {
      headers: createSupabaseHeaders(readKey),
      cache: "no-store",
    },
  );

  if (response.status === 404) return defaultContent;
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to load site content: ${response.status} ${message}`);
  }

  const rows = (await response.json()) as Array<{ content?: Partial<SiteContent> }>;
  return mergeContent(rows[0]?.content);
}

export async function saveSiteContent(content: SiteContent) {
  const config = getSupabaseConfig();
  const adminKey = getAdminKey();

  if (!config) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!adminKey) {
    throw new Error("Missing SUPABASE_SECRET_KEY");
  }

  const response = await fetch(`${config.url}/rest/v1/site_content`, {
    method: "POST",
    headers: {
      ...createSupabaseHeaders(adminKey),
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      id: CONTENT_ID,
      content,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to save site content: ${response.status} ${message}`);
  }
}

import { NextResponse } from "next/server";
import { addGuestMessage } from "@/lib/supabase-rest";

const MAX_NAME_LENGTH = 40;
const MAX_MESSAGE_LENGTH = 1000;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: string; content?: string };
    const name = body.name?.trim().slice(0, MAX_NAME_LENGTH);
    const content = body.content?.trim().slice(0, MAX_MESSAGE_LENGTH);

    if (!name || !content) {
      return NextResponse.json({ error: "Missing name or message" }, { status: 400 });
    }

    const message = await addGuestMessage({ name, content });
    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to submit message" },
      { status: 500 },
    );
  }
}

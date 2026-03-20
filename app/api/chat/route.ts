import { NextResponse } from "next/server";
import { craftReply } from "@/lib/brain";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages)
      ? (body.messages as ChatMessage[])
      : [];

    const { reply, sources, phase } = craftReply(messages);

    return NextResponse.json({ reply, sources, phase });
  } catch {
    return NextResponse.json(
      { error: "Could not read your message. Please try again." },
      { status: 400 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

// Keep this in sync with what's actually offered on the site — the model
// should never promise things the business can't do yet (like checking
// live slot availability), since there's no booking backend wired up.
const SYSTEM_PROMPT = `You are the booking assistant for Bloom, a salon and wellness studio.
Be warm, brief, and helpful. You can answer questions about the services
listed on the site (cuts, colour, treatments, bridal styling, blow-dry) and
their approximate price and duration. You cannot check real-time
appointment availability — if someone asks to actually book a slot, tell
them to use the "Book an appointment" button on the site. Keep replies to
2-3 sentences.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing ANTHROPIC_API_KEY. Add it to .env.local (see .env.local.example) and restart the dev server.",
      },
      { status: 500 }
    );
  }

  const { messages } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        // Haiku keeps a chat widget cheap to run; swap to a larger model
        // later if you want richer answers.
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json(
        { error: "The assistant is unavailable right now. Try again shortly." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply =
      data.content?.find((block: { type: string }) => block.type === "text")
        ?.text ?? "Sorry, I didn't catch that — could you rephrase?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route failed:", err);
    return NextResponse.json(
      { error: "Something went wrong reaching the assistant." },
      { status: 500 }
    );
  }
}

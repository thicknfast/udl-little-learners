import { NextResponse } from "next/server";

const FORMSPREE_URL = "https://formspree.io/f/mrevjaze";

function isLikelyRealEmail(value: unknown) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export async function POST(request: Request) {
  const body = await request.json();

  // Honeypot — a real user never fills this in, only bots that fill every field.
  if (body._gotcha) {
    return NextResponse.json({ ok: true });
  }

  if (!isLikelyRealEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const formspreeRes = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...body, _subject: `Bulk Order Quote Request — ${body.name}` }),
  });

  if (!formspreeRes.ok) {
    return NextResponse.json({ ok: false, error: "formspree_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

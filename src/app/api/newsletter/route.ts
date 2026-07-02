import { NextResponse } from "next/server";
import { addBeehiivSubscriber } from "@/lib/beehiiv";

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

  const name = typeof body.name === "string" ? body.name.trim() : "";

  // Unlike /api/preorder, there's no Formspree fallback here — Beehiiv is
  // the only place this signup is recorded, so a sync failure has to be
  // reported back to the user instead of silently swallowed.
  const synced = await addBeehiivSubscriber(body.email.trim(), {
    utmSource: "newsletter-signup",
    customFields: name ? [{ name: "Name", value: name }] : undefined,
  });

  if (!synced) {
    return NextResponse.json({ ok: false, error: "sync_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

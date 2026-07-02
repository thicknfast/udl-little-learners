import { NextResponse } from "next/server";

const FORMSPREE_URL = "https://formspree.io/f/mrevjaze";
const KIT_API_BASE = "https://api.kit.com/v4";

function isLikelyRealConfirmation(value: unknown) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  // Mirrors the client-side check in preorder/page.tsx — this is the real
  // boundary since the client check can be bypassed by posting directly here.
  return trimmed.length >= 5 && /[0-9]/.test(trimmed);
}

interface PreorderSubmission {
  name: string;
  email: string;
  retailer: string;
  confirmation: string;
  role: string;
  location: string;
  schoolName: string;
  schoolType: string;
  gradeLevel: string;
  howHeard: string;
  emailOptIn: boolean;
}

async function addToKit(data: PreorderSubmission) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    console.warn("KIT_API_KEY not set — skipping Kit sync for", data.email);
    return;
  }

  const subscriberRes = await fetch(`${KIT_API_BASE}/subscribers`, {
    method: "POST",
    headers: { "X-Kit-Api-Key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      email_address: data.email,
      first_name: data.name,
      fields: {
        role: data.role,
        location: data.location,
        school_name: data.schoolName,
        school_type: data.schoolType,
        grade_level: data.gradeLevel,
        how_heard: data.howHeard,
        retailer: data.retailer,
      },
    }),
  });

  if (!subscriberRes.ok) {
    console.error("Kit: failed to create/update subscriber", await subscriberRes.text());
    return;
  }

  const tagId = process.env.KIT_PREORDER_TAG_ID;
  if (!tagId) {
    console.warn("KIT_PREORDER_TAG_ID not set — subscriber added but not tagged");
    return;
  }

  const tagRes = await fetch(`${KIT_API_BASE}/tags/${tagId}/subscribers`, {
    method: "POST",
    headers: { "X-Kit-Api-Key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email_address: data.email }),
  });

  if (!tagRes.ok) {
    console.error("Kit: failed to tag subscriber", await tagRes.text());
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  // Honeypot — a real user never fills this in, only bots that fill every field.
  if (body._gotcha) {
    return NextResponse.json({ ok: true });
  }

  if (!isLikelyRealConfirmation(body.confirmation)) {
    return NextResponse.json({ ok: false, error: "invalid_confirmation" }, { status: 400 });
  }

  const formspreeRes = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...body, _subject: `Pre-order Bonus Claim — ${body.name}` }),
  });

  if (!formspreeRes.ok) {
    return NextResponse.json({ ok: false, error: "formspree_failed" }, { status: 502 });
  }

  if (body.emailOptIn) {
    try {
      await addToKit(body as PreorderSubmission);
    } catch (err) {
      // Don't fail the whole submission just because the email-list sync failed.
      console.error("Kit sync threw", err);
    }
  }

  return NextResponse.json({ ok: true });
}

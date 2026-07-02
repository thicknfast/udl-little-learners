import { NextResponse } from "next/server";
import { addBeehiivSubscriber } from "@/lib/beehiiv";

const FORMSPREE_URL = "https://formspree.io/f/mrevjaze";

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

async function addToBeehiiv(data: PreorderSubmission) {
  await addBeehiivSubscriber(data.email, {
    utmSource: "preorder-form",
    customFields: [
      { name: "Name", value: data.name },
      { name: "Role", value: data.role },
      { name: "Location", value: data.location },
      { name: "School Name", value: data.schoolName },
      { name: "School Type", value: data.schoolType },
      { name: "Grade Level", value: data.gradeLevel },
      { name: "How Heard", value: data.howHeard },
      { name: "Retailer", value: data.retailer },
    ],
  });
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
      await addToBeehiiv(body as PreorderSubmission);
    } catch (err) {
      // Don't fail the whole submission just because the email-list sync failed.
      console.error("Beehiiv sync threw", err);
    }
  }

  return NextResponse.json({ ok: true });
}

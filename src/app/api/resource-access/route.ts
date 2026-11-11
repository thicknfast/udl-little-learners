import { NextResponse } from "next/server";
import { addBeehiivSubscriber } from "@/lib/beehiiv";

const FORMSPREE_URL = "https://formspree.io/f/mrevjaze";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

// Records who unlocked a gated Resource Hub download, and adds them to the
// newsletter only if they chose to opt in.
export async function POST(request: Request) {
  const body = await request.json();

  // Honeypot — a real user never fills this in, only bots that fill every field.
  if (body._gotcha) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const role = clean(body.role);
  const resource = clean(body.resource);
  const newsletter = body.newsletter === "yes";

  if (!name || !role || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const formspreeRes = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      email,
      role,
      resource,
      newsletter: newsletter ? "Opted in" : "Opted out",
      _subject: `Resource Download — ${resource} — ${name}`,
    }),
  });

  if (!formspreeRes.ok) {
    return NextResponse.json({ ok: false, error: "formspree_failed" }, { status: 502 });
  }

  if (newsletter) {
    try {
      await addBeehiivSubscriber(email, {
        utmSource: "resource-hub",
        customFields: [
          { name: "Name", value: name },
          { name: "Role", value: role },
        ],
      });
    } catch (err) {
      // The download still unlocks; Formspree has the record either way.
      console.error("Beehiiv sync threw", err);
    }
  }

  return NextResponse.json({ ok: true });
}

interface BeehiivCustomField {
  name: string;
  value: string;
}

interface AddSubscriberOptions {
  utmSource: string;
  customFields?: BeehiivCustomField[];
}

// Custom fields must already exist in the Beehiiv publication (Audience →
// Subscribers → Custom Fields) with matching names, or Beehiiv rejects them
// — unlike Kit, it doesn't auto-create unknown fields on write.
export async function addBeehiivSubscriber(email: string, opts: AddSubscriberOptions) {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const rawPublicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !rawPublicationId) {
    console.warn("Beehiiv not configured — skipping email list sync for", email);
    return false;
  }
  // Beehiiv publication IDs must be prefixed "pub_" — the dashboard doesn't
  // always show it that way when you copy the ID, so tolerate either form.
  const publicationId = rawPublicationId.startsWith("pub_") ? rawPublicationId : `pub_${rawPublicationId}`;

  const res = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      utm_source: opts.utmSource,
      ...(opts.customFields ? { custom_fields: opts.customFields } : {}),
    }),
  });

  if (!res.ok) {
    console.error("Beehiiv: failed to add subscriber", await res.text());
    return false;
  }
  return true;
}

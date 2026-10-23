// Workshops and conferences where Jeff hands out the free /play link.
// The `?from=` key on /play and /newsletter maps to the Beehiiv utm_source,
// so signups from each event can be told apart in Beehiiv.
export const EVENT_SOURCES: Record<string, string> = {
  caudl: "caudl-2026",
  chicopee: "chicopee-2026",
};

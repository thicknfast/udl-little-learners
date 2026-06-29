import { Container } from "@/components/Container";

export const metadata = {
  title: "Pre-Order Bonus Content — UDL for Little Learners",
  robots: { index: false, follow: false },
};

const RESOURCES = [
  {
    title: "Before You Read Self-Assessment",
    description:
      "Reflect on your current UDL practices before diving into the book. This self-assessment helps you identify strengths and set a personal learning focus as you read.",
    icon: "✅",
    label: "Download PDF",
    href: "/resources/before-you-read-self-assessment.pdf",
    color: "orange" as const,
    download: true,
  },
  {
    title: "Administrator's Guide",
    description:
      "A companion resource for early childhood directors and principals. Includes a UDL observation framework, coaching questions, a professional learning menu, and a family communication template.",
    icon: "📋",
    label: "Download PDF",
    href: "/resources/administrators-guide.pdf",
    color: "orange" as const,
    download: true,
  },
  {
    title: "Calendar Journal Template",
    description:
      "A fully editable calendar journal you can customize for your classroom. Open in Google Slides and make it your own.",
    icon: "📅",
    label: "Open in Google Slides",
    href: "https://docs.google.com/presentation/d/1FzMUmJSBEayMod8XVZiEYQNGMTko7VnT/edit?usp=drive_link&ouid=109978945231253701941&rtpof=true&sd=true",
    color: "blue" as const,
    note: [
      "Calendar time can have a participation problem. One student is called up to the board, and the others are watching — or not watching. It looks like a group activity, but most of the learning is happening for one kid at a time. One of the big ideas in the book is that UDL works best when it's built into your planning before kids walk through the door. That's where this calendar journal comes in — it puts a pencil in every hand.",
      "The template has two versions. The Scaffolded Version gives students visual supports — they circle the day of the week from a list, choose from weather icons, and fill in guided sections for date, patterns, and the Number of the Day. The Open-Ended Version uses the exact same structure but opens up the response — students write the day name, draw or describe the weather in their own words, and have more blank space to show what they know. Same page, same routine, different entry points — that's the whole UDL idea: same learning target, multiple ways to access it.",
      "Print both versions and put them out during morning meeting or calendar time. Don't pre-assign — let students choose which one they want to use that day. The Number of the Day section is where you'll really start to see them: they can show the number through tally marks, a ten frame, coins, fingers, dots, base-10 blocks, or their own way. Some kids will grab the Scaffolded Version every day. Others will try it once and switch. A few will surprise you. By the time the book arrives, you'll have a classroom full of real evidence about how your students think — and what they're ready to reach toward next.",
    ],
  },
  {
    title: "Quick Win Cards",
    description:
      "30 printable cards, each with a single, immediately actionable UDL strategy. Cut them apart, pull one a week, or use them as a team discussion starter. No planning required — just pick one and try it.",
    icon: "⚡",
    label: "Download PDF",
    href: "/resources/quick-win-cards.pdf",
    color: "orange" as const,
    download: true,
  },
  {
    title: "Classroom Environment Audit",
    description:
      "A room-by-room audit tool for evaluating your physical space through a UDL lens. Covers flexible seating, sensory considerations, materials access, wall displays, and more — with reflection prompts for each area.",
    icon: "🏫",
    label: "Download PDF",
    href: "/resources/classroom-environment-audit.pdf",
    color: "orange" as const,
    download: true,
  },
  {
    title: "Predicting Barriers Planning Template",
    description:
      "A planning tool for thinking proactively about barriers before a lesson or routine. Use it to anticipate where students might struggle and design supports in advance — the core UDL planning move.",
    icon: "🔍",
    label: "Download PDF",
    href: "/resources/predicting-barriers-template.pdf",
    color: "orange" as const,
    download: true,
  },
  {
    title: "Learning Walk Guide",
    description:
      "A structured observation tool for administrators and instructional coaches to identify UDL in practice. Includes a classroom look-for framework, reflection prompts, and a follow-up conversation guide.",
    icon: "🚶",
    label: "Download PDF",
    href: "/resources/learning-walk-guide.pdf",
    color: "orange" as const,
    download: true,
  },
  {
    title: "Pre-Order Bonus Folder",
    description:
      "All pre-order bonus materials in one place. Bookmark this folder — Jeff will add more content here as the launch approaches.",
    icon: "📁",
    label: "Open Bonus Folder",
    href: "https://drive.google.com/drive/folders/1kKL-J8ivApgBs8OHYqZOiO5ff1fXPdTA?usp=drive_link",
    color: "orange" as const,
  },
];

export default function PreorderResourcesPage() {
  return (
    <section className="py-12">
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-green/15 px-4 py-1 text-sm font-bold text-green">
              Exclusive for Pre-Orders
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold text-blue sm:text-4xl">
              Your Free Bonus Content
            </h1>
            <p className="mt-4 text-lg text-text-light leading-relaxed">
              Thank you for pre-ordering <em>UDL for Little Learners</em>! These resources
              are just for you. Bookmark this page or the Google Drive folder so you can
              come back anytime.
            </p>
          </div>

          {/* Resources */}
          <div className="mt-10 space-y-4">
            {RESOURCES.map((r) => (
              <div key={r.href} className="rounded-2xl border border-border bg-white shadow-sm">
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cream text-3xl">
                    {r.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-lg font-bold text-text">{r.title}</h2>
                    <p className="mt-1 text-sm text-text-light">{r.description}</p>
                  </div>
                  <a
                    href={r.href}
                    {...(r.download ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className={`shrink-0 rounded-full px-6 py-3 text-center font-display font-bold text-white shadow-md transition sm:w-auto ${
                      r.color === "orange"
                        ? "bg-orange hover:bg-orange-dark"
                        : "bg-blue hover:bg-blue-dark"
                    }`}
                  >
                    {r.label}
                  </a>
                </div>
                {r.note && (
                  <div className="border-t border-border bg-cream/60 px-6 py-5 rounded-b-2xl">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-orange">
                      A note from Jeff
                    </p>
                    <div className="space-y-3">
                      {r.note.map((para, i) => (
                        <p key={i} className="text-sm text-text leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-sm text-text-light">
            Questions? Reach out at{" "}
            <a href="/connect" className="text-blue underline hover:text-blue-dark">
              udlforlittlelearners.com/connect
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

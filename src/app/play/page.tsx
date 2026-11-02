import Image from "next/image";
import { Container } from "@/components/Container";
import { EVENT_SOURCES } from "@/lib/events";

// Free link handed out at workshops (Chicopee, CAUDL). Not in the nav and
// not indexed; pre-order readers get the same tools on /preorder/resources.
export const metadata = {
  title: "Free UDL Tools for Early Childhood",
  robots: { index: false, follow: false },
};

const PLAY_INSIDE = [
  ["Play Is Already UDL", "The framework on one page, plus the playful learning spectrum"],
  ["One Goal, Many Ways to Play", "A worked example and a blank version for your team"],
  ["Predicting Barriers to Play", "Common barriers with a design move for each"],
  ["Play Center Planner", "A printable template for one play area or play block"],
  ["The Adult's Role in Play", "Five stances, questions that stretch play, and language for kids"],
  ["Play Look-Fors", "An observation tool for teachers, coaches, and leaders"],
  ["Why We Play at School", "A family handout you can copy and send home"],
];

const JOURNAL_INSIDE = [
  ["Scaffolded Version", "Circle the day, choose a weather icon, and fill in guided sections"],
  ["Open-Ended Version", "The same routine with room for students to write, draw, and show what they know"],
  ["Number of the Day", "Tally marks, ten frames, coins, base-10 blocks, or their own way"],
];

const TOOLS = [
  {
    icon: "🧸",
    title: "Planning for Play: A UDL Toolkit",
    description:
      "Firm goals, flexible play. Eight printable pages to help you plan, protect, and notice the learning that happens when young children play.",
    label: "Download the Toolkit (PDF)",
    href: "/resources/play-toolkit.pdf",
    download: true,
    inside: PLAY_INSIDE,
  },
  {
    icon: "📅",
    title: "My Calendar Journal",
    description:
      "Put a pencil in every hand during calendar time. Two versions of the same page, so every student has a way in. Let them choose which one to use.",
    label: "Make a Copy in Google Slides",
    href: "https://docs.google.com/presentation/d/1FzMUmJSBEayMod8XVZiEYQNGMTko7VnT/copy",
    download: false,
    inside: JOURNAL_INSIDE,
  },
];

export default async function PlayPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const fromQuery = from && EVENT_SOURCES[from] ? `?from=${from}` : "";

  return (
    <section className="py-12">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-green/15 px-4 py-1 text-sm font-bold text-green">
              Free for Educators
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold text-blue sm:text-4xl">
              Two Free UDL Tools for Your Classroom
            </h1>
            <p className="mt-4 text-lg text-text-light leading-relaxed">
              Ready-to-use tools from <em>UDL for Little Learners</em> to help you plan for play
              and give every child a way into your daily routines.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {TOOLS.map((tool) => (
              <div key={tool.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cream text-3xl">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-bold text-text">{tool.title}</h2>
                    <p className="mt-1 text-sm text-text-light leading-relaxed">{tool.description}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 border-t border-border pt-4">
                  {tool.inside.map(([title, desc]) => (
                    <li key={title} className="text-sm text-text-light">
                      <span className="font-semibold text-text">{title}.</span> {desc}
                    </li>
                  ))}
                </ul>
                <a
                  href={tool.href}
                  {...(tool.download ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="mt-5 inline-block rounded-full bg-orange px-7 py-3 font-display font-bold text-white shadow-md transition hover:bg-orange-dark"
                >
                  {tool.label}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-cream/60 p-6 sm:flex-row sm:items-center">
            <Image
              src="/images/cover.png"
              alt="UDL for Little Learners book cover"
              width={90}
              height={119}
              className="mx-auto shrink-0 rounded-lg shadow-md sm:mx-0"
            />
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-text">Want more like this?</h2>
              <p className="mt-1 text-sm text-text-light">
                These tools are companions to <em>UDL for Little Learners</em>. Join the list for
                practical strategies and new resources, or get the book for the full set of
                reader bonuses.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`/newsletter${fromQuery}`}
                  className="rounded-full bg-blue px-5 py-2.5 font-display text-sm font-bold text-white shadow-md transition hover:bg-blue-dark"
                >
                  Join the List
                </a>
                <a
                  href="/preorder"
                  className="rounded-full border-2 border-blue px-5 py-2 font-display text-sm font-bold text-blue transition hover:bg-blue hover:text-white"
                >
                  Get the Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

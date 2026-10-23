import Image from "next/image";
import { Container } from "@/components/Container";
import { EVENT_SOURCES } from "@/lib/events";

// Free link handed out at workshops (Chicopee, CAUDL). Not in the nav and
// not indexed; pre-order readers get the same toolkit on /preorder/resources.
export const metadata = {
  title: "Planning for Play: A UDL Toolkit",
  robots: { index: false, follow: false },
};

const INSIDE = [
  ["Play Is Already UDL", "The framework on one page, plus the playful learning spectrum"],
  ["One Goal, Many Ways to Play", "A worked example and a blank version for your team"],
  ["Predicting Barriers to Play", "Common barriers with a design move for each"],
  ["Play Center Planner", "A printable template for one play area or play block"],
  ["The Adult's Role in Play", "Five stances, questions that stretch play, and language for kids"],
  ["Play Look-Fors", "An observation tool for teachers, coaches, and leaders"],
  ["Why We Play at School", "A family handout you can copy and send home"],
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
              Planning for Play: A UDL Toolkit
            </h1>
            <p className="mt-4 text-lg text-text-light leading-relaxed">
              Firm goals, flexible play. Eight printable pages to help you plan, protect, and
              notice the learning that happens when young children play.
            </p>
            <a
              href="/resources/play-toolkit.pdf"
              className="mt-8 inline-block rounded-full bg-orange px-8 py-4 font-display text-lg font-bold text-white shadow-md transition hover:bg-orange-dark"
            >
              Download the Toolkit (PDF)
            </a>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-text">What&apos;s inside</h2>
            <ul className="mt-3 space-y-2">
              {INSIDE.map(([title, desc]) => (
                <li key={title} className="text-sm text-text-light">
                  <span className="font-semibold text-text">{title}.</span> {desc}
                </li>
              ))}
            </ul>
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
                This toolkit is a companion to <em>UDL for Little Learners</em>. Join the list for
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

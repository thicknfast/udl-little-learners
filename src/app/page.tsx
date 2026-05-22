import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Container } from "@/components/Container";
import { DiscussionGuideBanner } from "@/components/DiscussionGuideCallout";
import { getAllResources } from "@/lib/resources";

function getHomeContent() {
  const filePath = path.join(process.cwd(), "content", "pages", "home.mdx");
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw).data as {
    heroSubtitle: string;
    heroDescription: string;
    testimonials: { quote: string; author: string; title: string }[];
  };
}

export default function Home() {
  const { heroSubtitle, heroDescription, testimonials } = getHomeContent();
  const resourceCount = getAllResources().length;

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
            <div className="text-center md:text-left">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-teal">
                Companion Resource Hub
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-text sm:text-5xl">
                UDL for{" "}
                <span className="text-blue">Little Learners</span>
              </h1>
              <p className="mt-2 font-display text-xl font-medium text-text-light">
                {heroSubtitle}
              </p>
              <div className="mt-4 h-1 w-12 rounded bg-teal" />
              <p className="mt-4 max-w-lg text-lg text-text-light">
                {heroDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/resources"
                  className="rounded-md bg-teal px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-teal-dark"
                >
                  Explore {resourceCount} Resources
                </Link>
                <Link
                  href="/book"
                  className="rounded-md border-2 border-border px-6 py-3 text-center font-display font-bold text-text transition hover:border-teal hover:text-teal"
                >
                  Get the Book
                </Link>
              </div>
            </div>
            <div className="shrink-0">
              <Image
                src="/images/cover.png"
                alt="UDL for Little Learners book cover"
                width={280}
                height={370}
                priority
                className="book-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats banner */}
      <section className="border-y border-border">
        <Container>
          <div className="grid grid-cols-2 divide-x divide-border py-10 sm:grid-cols-4">
            {[
              { number: resourceCount, suffix: "+", label: "Free resources" },
              { number: 17, suffix: "", label: "Book chapters covered" },
              { number: 11, suffix: "+", label: "Downloadable PDFs" },
              { number: 100, suffix: "%", label: "Free to access" },
            ].map(({ number, suffix, label }) => (
              <div key={label} className="px-6 first:pl-0 last:pr-0">
                <div className="text-4xl font-bold leading-none tracking-tight text-text">
                  {number}<span className="text-teal">{suffix}</span>
                </div>
                <div className="mt-2 text-sm font-medium text-text-light">{label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Discussion guide banner */}
      <DiscussionGuideBanner />

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="border-t border-border bg-white/60 py-16">
          <Container>
            <h2 className="text-center font-display text-2xl font-bold text-text">
              What Educators Are Saying
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-white p-6 shadow-sm"
                >
                  <p className="italic text-text-light">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4">
                    <p className="font-display font-bold text-text">{t.author}</p>
                    <p className="text-sm text-text-light">{t.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Quick CTA */}
      <section className="py-16">
        <Container className="text-center">
          <h2 className="font-display text-2xl font-bold text-text">
            Ready to transform your classroom?
          </h2>
          <p className="mt-2 text-text-light">
            Explore practical strategies, bonus chapters, and hands-on activities.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/connect"
              className="rounded-full bg-teal px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-teal-dark"
            >
              Book Jeff to Speak
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

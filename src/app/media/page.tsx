import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Container } from "@/components/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & Podcasts",
  description:
    "Podcast appearances and articles by Jeff Horwitz, author of UDL for Little Learners.",
};

type Appearance = {
  show: string;
  episode: string;
  host: string;
  date: string;
  url: string;
};

type Article = {
  title: string;
  outlet: string;
  date: string;
  url: string;
};

function getMediaContent() {
  const filePath = path.join(process.cwd(), "content", "pages", "media.mdx");
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw).data as {
    intro: string;
    appearances: Appearance[];
    articles: Article[];
  };
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const ExternalLinkIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export default function Media() {
  const { intro, appearances, articles } = getMediaContent();

  return (
    <section className="py-16">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
          Media &amp; Podcasts
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-light">
          {intro}
        </p>

        <h2 className="mt-12 font-display text-xl font-bold text-text">
          Podcast Appearances
        </h2>
        <div className="mt-6 space-y-5">
          {appearances.map((a) => (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:border-blue/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-teal">
                  {a.show}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-text group-hover:text-blue">
                  {a.episode}
                </h3>
                <p className="mt-1 text-sm text-text-light">
                  {a.host && <>with {a.host} &middot; </>}
                  {formatDate(a.date)}
                </p>
              </div>
              <span className="mt-3 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue sm:mt-0">
                Listen / Watch
                <ExternalLinkIcon />
              </span>
            </a>
          ))}
        </div>

        <h2 className="mt-14 font-display text-xl font-bold text-text">
          Articles
        </h2>
        <div className="mt-6 space-y-5">
          {articles.map((a) => (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:border-blue/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-teal">
                  {a.outlet}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-text group-hover:text-blue">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-text-light">{formatDate(a.date)}</p>
              </div>
              <span className="mt-3 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue sm:mt-0">
                Read
                <ExternalLinkIcon />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

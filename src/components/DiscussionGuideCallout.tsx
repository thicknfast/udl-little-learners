import Link from "next/link";

export function DiscussionGuideCallout() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-teal p-8 text-white shadow-xl sm:p-10">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-white/[0.06]" />
      <div className="pointer-events-none absolute right-40 bottom-0 h-28 w-28 rounded-full bg-white/[0.08]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Text */}
        <div className="flex-1">
          <span className="inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Start Here
          </span>

          <h2 className="mt-3 font-display text-2xl font-extrabold leading-snug sm:text-3xl">
            Discussion Guide &amp; Activities
          </h2>

          <p className="mt-2 max-w-lg text-base leading-relaxed text-white/85">
            A complete professional development companion — reflection questions
            and hands-on activities for all 16 chapters. Whether you&rsquo;re
            reading solo, with a colleague, or leading a book study, this is
            where to begin.
          </p>

          <ul className="mt-5 space-y-2">
            {[
              "Reflection prompts for every chapter",
              "Hands-on activities to use with your team",
              "Ideal for book clubs, PD days, and coaching cycles",
              "Free PDF download — no sign-up required",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-white/70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex shrink-0 flex-col items-start gap-3 lg:items-center">
          <div className="text-5xl" aria-hidden>📖</div>
          <a
            href="/resources/discussion-and-activities.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-display text-base font-bold text-teal shadow-md transition hover:bg-teal/10 hover:shadow-lg"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Free PDF
          </a>
          <Link
            href="/resources/discussion-and-activities"
            className="text-sm text-white/70 underline underline-offset-2 transition hover:text-white"
          >
            View resource details →
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Slim horizontal banner variant — used on the homepage */
export function DiscussionGuideBanner() {
  return (
    <div className="border-y border-teal/20 bg-teal/[0.07] py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl" aria-hidden>📖</span>
          <div>
            <p className="font-display font-bold text-text">
              New to the book? Start with the free Discussion Guide.
            </p>
            <p className="text-sm text-text-light">
              Reflection questions &amp; activities for all 16 chapters — perfect for book clubs &amp; PD.
            </p>
          </div>
        </div>
        <a
          href="/resources/discussion-and-activities.pdf"
          download
          className="shrink-0 rounded-full bg-teal px-6 py-2.5 font-display text-sm font-bold text-white shadow-md transition hover:bg-teal-dark"
        >
          Download Free
        </a>
      </div>
    </div>
  );
}

import Link from "next/link";

/** Spotlight for the Planning for Play toolkit on the Resource Hub. */
export function PlayToolkitCallout() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-orange p-8 text-white shadow-xl sm:p-10">
      <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-white/[0.06]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1">
          <span className="inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Beyond the Book
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-snug sm:text-3xl">
            Planning for Play: A UDL Toolkit
          </h2>
          <p className="mt-2 max-w-lg text-base leading-relaxed text-white/90">
            Firm goals, flexible play. Eight printable pages to help you plan, protect, and
            notice the learning that happens when young children play.
          </p>
          <ul className="mt-5 space-y-2">
            {[
              "A one-page framework: play is already UDL",
              "A play center planner and barriers checklist",
              "Look-fors for teachers, coaches, and leaders",
              "A family handout on why we play at school",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-white/70" fill="currentColor" viewBox="0 0 20 20">
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

        <div className="flex shrink-0 flex-col items-start gap-3 lg:items-center">
          <div className="text-5xl" aria-hidden>🧸</div>
          <Link
            href="/resources/play-toolkit"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-display text-base font-bold text-orange shadow-md transition hover:shadow-lg"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Get the Free Toolkit
          </Link>
        </div>
      </div>
    </div>
  );
}

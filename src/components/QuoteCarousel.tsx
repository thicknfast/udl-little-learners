"use client";

import { useEffect, useState } from "react";

interface QuoteCarouselProps {
  quotes: string[];
  author: string;
  authorTitle: string;
  intervalMs?: number;
}

export function QuoteCarousel({
  quotes,
  author,
  authorTitle,
  intervalMs = 6000,
}: QuoteCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || quotes.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % quotes.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, quotes.length, intervalMs]);

  if (!quotes.length) return null;

  return (
    <div
      className="mx-auto max-w-2xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <svg
        className="mx-auto h-8 w-8 text-teal/40"
        fill="currentColor"
        viewBox="0 0 32 32"
        aria-hidden
      >
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>

      <div className="relative mt-4 min-h-[9rem] sm:min-h-[7rem]">
        {quotes.map((quote, i) => (
          <p
            key={i}
            className={`absolute inset-0 font-display text-xl font-medium italic leading-relaxed text-text transition-opacity duration-700 sm:text-2xl ${
              i === current ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            &ldquo;{quote}&rdquo;
          </p>
        ))}
      </div>

      <p className="mt-6 font-display font-bold text-blue">{author}</p>
      <p className="text-sm text-text-light">{authorTitle}</p>

      {quotes.length > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-teal" : "w-2 bg-border hover:bg-teal/50"
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

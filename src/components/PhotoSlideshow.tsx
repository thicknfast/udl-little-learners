"use client";

import { useState } from "react";
import Image from "next/image";

interface PhotoSlideshowProps {
  photos: string[];
  alt?: string;
}

export function PhotoSlideshow({ photos, alt = "Photo" }: PhotoSlideshowProps) {
  const [current, setCurrent] = useState(0);

  if (!photos.length) return null;

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  return (
    <div className="mt-6">
      <div className="relative overflow-hidden rounded-2xl bg-black shadow-lg" style={{ aspectRatio: "4/3" }}>
        <Image
          key={photos[current]}
          src={photos[current]}
          alt={`${alt} ${current + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 800px"
          priority={current === 0}
        />

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition"
          aria-label="Previous photo"
        >
          <svg className="h-5 w-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition"
          aria-label="Next photo"
        >
          <svg className="h-5 w-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Counter badge */}
        <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          {current + 1} / {photos.length}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-blue" : "w-2 bg-border hover:bg-blue/50"}`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${i === current ? "border-blue" : "border-transparent opacity-60 hover:opacity-100"}`}
          >
            <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { ResourceCard } from "@/components/ResourceCard";
import {
  Resource,
  ResourceType,
  RESOURCE_TYPE_LABELS,
  BOOK_PARTS,
} from "@/lib/types";

type ViewMode = "chapter" | "type";

export function ResourcesClient({ resources }: { resources: Resource[] }) {
  const [view, setView] = useState<ViewMode>("chapter");
  const [activeType, setActiveType] = useState<ResourceType | "all">("all");

  const typeKeys = Object.keys(RESOURCE_TYPE_LABELS) as ResourceType[];
  const featured = resources.filter((r) => r.featured);
  const nonFeatured = resources.filter((r) => !r.featured);
  const filteredByType =
    activeType === "all"
      ? resources
      : resources.filter((r) => r.type === activeType);

  return (
    <section className="py-12">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
          Resource Hub
        </h1>
        <p className="mt-2 text-text-light">
          Companion resources for <em>UDL for Little Learners</em>. Browse by
          chapter or filter by type.
        </p>

        {/* View toggle */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setView("chapter")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              view === "chapter"
                ? "bg-blue text-white"
                : "bg-white text-text border border-border hover:border-blue/30"
            }`}
          >
            By Chapter
          </button>
          <button
            onClick={() => setView("type")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              view === "type"
                ? "bg-blue text-white"
                : "bg-white text-text border border-border hover:border-blue/30"
            }`}
          >
            By Type
          </button>
        </div>

        {/* Featured resources */}
        {featured.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-xl font-bold text-orange">
              Featured Resource
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {featured.map((r) => (
                <ResourceCard key={r.slug} resource={r} />
              ))}
            </div>
          </div>
        )}

        {/* Chapter view */}
        {view === "chapter" && (
          <div className="mt-8 space-y-10">
            {BOOK_PARTS.map((part) => {
              const partResources = nonFeatured.filter(
                (r) => r.part === part.part
              );
              if (partResources.length === 0) return null;
              return (
                <div key={part.part}>
                  <h2 className="font-display text-xl font-bold text-text">
                    Part {part.part}: {part.title}
                  </h2>
                  {part.chapters.map((ch) => {
                    const chapterResources = nonFeatured.filter(
                      (r) => r.chapter === ch.num
                    );
                    if (chapterResources.length === 0) return null;
                    return (
                      <div key={ch.num} className="mt-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-text-light">
                          Chapter {ch.num}: {ch.title}
                        </h3>
                        <div className="mt-2 grid gap-4 sm:grid-cols-2">
                          {chapterResources.map((r) => (
                            <ResourceCard key={r.slug} resource={r} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Bonus section */}
            {nonFeatured.filter((r) => r.part === "bonus").length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold text-text">
                  Bonus Materials
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {nonFeatured
                    .filter((r) => r.part === "bonus")
                    .map((r) => (
                      <ResourceCard key={r.slug} resource={r} />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Type view */}
        {view === "type" && (
          <div className="mt-6">
            {/* Type filter pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveType("all")}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  activeType === "all"
                    ? "bg-blue text-white"
                    : "bg-white text-text border border-border hover:border-blue/30"
                }`}
              >
                All ({resources.length})
              </button>
              {typeKeys.map((type) => {
                const count = resources.filter((r) => r.type === type).length;
                if (count === 0) return null;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                      activeType === type
                        ? "bg-blue text-white"
                        : "bg-white text-text border border-border hover:border-blue/30"
                    }`}
                  >
                    {RESOURCE_TYPE_LABELS[type]} ({count})
                  </button>
                );
              })}
            </div>

            {/* Filtered grid */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {filteredByType.map((r) => (
                <ResourceCard key={r.slug} resource={r} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

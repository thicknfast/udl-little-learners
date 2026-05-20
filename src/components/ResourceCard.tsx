import Link from "next/link";
import { Resource, RESOURCE_TYPE_LABELS } from "@/lib/types";

const TYPE_COLORS: Record<string, string> = {
  "bonus-chapter": "bg-pink/10 text-pink",
  "discussion-guide": "bg-orange/10 text-orange",
  template: "bg-green/10 text-green",
  reference: "bg-blue/10 text-blue",
  photo: "bg-yellow/10 text-yellow",
  video: "bg-pink/10 text-pink",
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const colorClass = TYPE_COLORS[resource.type] ?? "bg-blue/10 text-blue";

  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:border-blue/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-text group-hover:text-blue">
          {resource.title}
        </h3>
        {resource.downloadFile && (
          <svg
            className="mt-1 h-5 w-5 shrink-0 text-text-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
        {!resource.downloadFile && resource.externalUrl && (
          <svg
            className="mt-1 h-5 w-5 shrink-0 text-text-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-light">
        {resource.description}
      </p>
      <div className="mt-auto pt-3">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}
        >
          {RESOURCE_TYPE_LABELS[resource.type]}
        </span>
        {resource.chapter && (
          <span className="ml-2 text-xs text-text-light">
            Chapter {resource.chapter}
          </span>
        )}
      </div>
    </Link>
  );
}

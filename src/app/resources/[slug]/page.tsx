import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MdxContent } from "@/components/MdxContent";
import { ResourceCard } from "@/components/ResourceCard";
import { getAllResources, getResourceBySlug } from "@/lib/resources";
import { RESOURCE_TYPE_LABELS } from "@/lib/types";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.description,
  };
}

export default async function ResourceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const all = getAllResources();
  const related = all
    .filter(
      (r) =>
        r.slug !== resource.slug &&
        (r.chapter === resource.chapter || r.part === resource.part)
    )
    .slice(0, 4);

  return (
    <section className="py-12">
      <Container>
        {/* Back link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-1 text-sm text-text-light hover:text-blue"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Resources
        </Link>

        {/* Header */}
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
              {RESOURCE_TYPE_LABELS[resource.type]}
            </span>
            {resource.chapter && (
              <span className="text-sm text-text-light">
                Chapter {resource.chapter}
                {resource.chapterTitle && `: ${resource.chapterTitle}`}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-text sm:text-4xl">
            {resource.title}
          </h1>
          <p className="mt-2 text-lg text-text-light">{resource.description}</p>
        </div>

        {/* Download button */}
        {resource.downloadFile && (
          <a
            href={resource.downloadFile}
            download
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-orange-dark"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </a>
        )}

        {/* External resource link */}
        {resource.externalUrl && (
          <a
            href={resource.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-blue/90"
          >
            <svg
              className="h-5 w-5"
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
            Open Resource
          </a>
        )}

        {/* Video embed or link */}
        {resource.videoUrl && (
          <div className="mt-6 aspect-video overflow-hidden rounded-xl">
            <iframe
              src={resource.videoUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {!resource.videoUrl && resource.driveUrl && (
          <a
            href={resource.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-blue hover:underline"
          >
            View on Google Drive
            <svg
              className="h-4 w-4"
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
          </a>
        )}

        {/* Content */}
        <div className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <MdxContent source={resource.content} />
        </div>

        {/* Related resources */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-text">
              Related Resources
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <ResourceCard key={r.slug} resource={r} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

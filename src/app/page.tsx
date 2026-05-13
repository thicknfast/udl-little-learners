import { getAllResources } from "@/lib/resources";

export default function Home() {
  const resources = getAllResources();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="font-display text-4xl font-bold text-blue">
        UDL for Little Learners
      </h1>
      <p className="text-text-light">
        {resources.length} resource(s) loaded
      </p>
      {resources.map((r) => (
        <div key={r.slug} className="rounded-xl border border-border bg-white p-4">
          <h2 className="font-display text-lg font-bold">{r.title}</h2>
          <p className="text-sm text-text-light">{r.description}</p>
        </div>
      ))}
    </main>
  );
}

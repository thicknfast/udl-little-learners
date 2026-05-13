import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-8 mb-3 font-display text-xl font-bold text-blue"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-6 mb-2 font-display text-lg font-semibold text-text"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mb-3 leading-relaxed text-text-light" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-1 text-text-light"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-1 text-text-light"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-text" {...props} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th
      className="border border-border bg-blue/5 px-3 py-2 text-left font-semibold text-text"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border border-border px-3 py-2 text-text-light" {...props} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-custom">
      <MDXRemote source={source} components={components} />
    </div>
  );
}

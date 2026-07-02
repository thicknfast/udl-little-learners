export function ComingSoonButton({ label }: { label: string }) {
  return (
    <div
      aria-disabled="true"
      className="flex flex-col items-center justify-center gap-0.5 rounded-full border-2 border-dashed border-border bg-cream px-6 py-3 text-center font-display font-bold text-text-light"
    >
      <span>{label}</span>
      <span className="text-xs font-normal uppercase tracking-wide">Coming Soon</span>
    </div>
  );
}

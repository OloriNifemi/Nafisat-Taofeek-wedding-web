export function Eyebrow({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="h-px w-8 bg-[var(--gold)]" />
      <span className="text-[11px] tracking-[0.4em] uppercase text-[var(--gold)]">
        {children}
      </span>
      <span className="h-px w-8 bg-[var(--gold)]" />
    </div>
  );
}

export function SectionTitle({ children, dark }) {
  return (
    <h2
      className={`text-4xl md:text-6xl font-light font-display ${dark ? "text-white" : "text-[var(--ink)]"}`}
    >
      {children}
    </h2>
  );
}

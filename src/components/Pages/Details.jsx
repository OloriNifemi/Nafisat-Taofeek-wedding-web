import { Eyebrow, SectionTitle } from "../Ui/Ui";

const COLORS = [
  { name: "Emerald Green", bg: "#2d6a4f", text: "#ffffff" },
  { name: "White",         bg: "#ffffff", text: "#555555" },
  { name: "Gold",          bg: "#c9a84c", text: "#ffffff" },
  { name: "Peach",         bg: "#ffcba4", text: "#7a4f3a" },
];

const DETAILS = [
  { label: "Date",          value: "09 · 10 · 2026" },
  { label: "Time",          value: "01:00 PM\n(No African Time)" },
  { label: "Color Of The Day", value: "colors" },
];

export default function Details() {
  return (
    <section
      id="details"
      className="py-24 md:py-32 px-6 md:px-10 bg-[var(--ink)] text-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>Save the Date</Eyebrow>
          <SectionTitle dark>Wedding Details</SectionTitle>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3">
          {DETAILS.map((d, i) => (
            <div
              key={d.label}
              className={`
                flex flex-col items-center justify-center
                text-center px-8 py-10
                ${
                  i === 0
                    ? "sm:border-r sm:border-[var(--gold-soft)]/20"
                    : i === DETAILS.length - 1
                      ? "sm:border-l sm:border-[var(--gold-soft)]/20"
                      : "sm:border-l sm:border-r sm:border-[var(--gold-soft)]/20"
                }
              `}
            >
              {/* Label */}
              <p className="mb-4 text-[9px] tracking-[0.5em] uppercase text-[var(--gold)]">
                {d.label}
              </p>

              {/* Thin gold rule */}
              <div className="mb-4 h-px w-6 bg-[var(--gold)]/40" />

              {/* Value */}
              {d.value === "colors" ? (
                <div className="flex flex-col items-center gap-3 w-full">
                  {/* Swatch row */}
                  <div className="flex items-center justify-center gap-2">
                    {COLORS.map((c) => (
                      <div
                        key={c.name}
                        className="w-7 h-7 rounded-full ring-1 ring-white/20 shadow-md"
                        style={{ backgroundColor: c.bg }}
                        title={c.name}
                      />
                    ))}
                  </div>
                  {/* Names below swatches */}
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                    {COLORS.map((c, ci) => (
                      <span
                        key={c.name}
                        className="text-[10px] tracking-[0.2em] uppercase text-white/50"
                      >
                        {c.name}
                        {ci < COLORS.length - 1 && (
                          <span className="ml-3 text-[var(--gold)]/30">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-white/75 leading-relaxed text-sm whitespace-pre-line">
                  {d.value}
                </p>
              )}

              {/* Mobile divider */}
              {i !== DETAILS.length - 1 && (
                <div className="mt-8 flex justify-center sm:hidden">
                  <div
                    className="h-10 w-px"
                    style={{ backgroundColor: "rgba(232,220,203,0.3)" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
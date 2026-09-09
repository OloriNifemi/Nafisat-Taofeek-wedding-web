import { Eyebrow, SectionTitle } from "../Ui/Ui";

const DETAILS = [
  {
    label: "Date",
    value: "September 12, 2026",
  },
  {
    label: "Time",
    value: "01:00 PM (No African Time)",
  },
  {
    label: "Color Of The Day",
    value: ["Chocolate Brown", "Champagne Gold", "Burnt Orange"],
  },
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

        {/* Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {DETAILS.map((d, i) => (
            <div
              key={d.label}
              className={`
                flex flex-col items-center justify-center
                text-center
                px-8 py-8

                ${
                  i === 0
                    ? "sm:border-r sm:border-[var(--gold-soft)]/20"
                    : i === DETAILS.length - 1
                      ? "sm:border-l sm:border-[var(--gold-soft)]/20"
                      : "sm:border-l sm:border-r sm:border-[var(--gold-soft)]/20"
                }
              `}
            >
              <p className="mb-2 text-[10px] tracking-[0.4em] uppercase text-[var(--ivory)]">
                {d.label}
              </p>

              <p className="text-white/80 leading-relaxed">
                {Array.isArray(d.value)
                  ? d.value.map((item) => (
                      <span key={item} className="block">
                        {item}
                      </span>
                    ))
                  : d.value}
              </p>

              {/* Mobile divider */}
              {i !== DETAILS.length - 1 && (
                <div className="mt-8 flex justify-center sm:hidden">
                  <div
                    className="h-10 w-px"
                    style={{ backgroundColor: "rgba(232,220,203,0.5)" }}
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

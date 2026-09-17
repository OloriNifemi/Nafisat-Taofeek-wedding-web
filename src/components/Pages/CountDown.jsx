import { useEffect, useState } from "react";

// ✅ Change this date for each couple — format: YYYY-MM-DDTHH:mm:ss
const WEDDING_DATE = new Date("2026-10-08T00:00:00");

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = WEDDING_DATE.getTime() - now;

  if (diff <= 0) {
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="font-display text-3xl md:text-4xl font-light text-white tracking-wide text-center">
          We're married! 💛
        </p>
        <div className="flex items-center gap-4 opacity-60">
          <span className="h-px w-12 bg-[var(--gold)]" />
          <span className="text-sm text-[var(--gold)]">✦</span>
          <span className="h-px w-12 bg-[var(--gold)]" />
        </div>
      </div>
    );
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const items = [
    { desktop: "Days", mobile: "Days", v: d },
    { desktop: "Hours", mobile: "Hrs", v: h },
    { desktop: "Minutes", mobile: "Min", v: m },
    { desktop: "Seconds", mobile: "Sec", v: s },
  ];

  return (
    <div className="grid w-full max-w-2xl grid-cols-4 gap-2 sm:gap-4">
      {items.map((it) => (
        <div
          key={it.desktop}
          className="rounded-xl border border-[var(--gold)]/40 bg-white/5 px-3 py-4 text-center backdrop-blur-xl sm:py-6"
        >
          <div className="text-3xl font-semibold text-[var(--gold)] [font-family:var(--font-sans)] sm:text-5xl">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="mt-1 font-display text-[10px] font-light uppercase tracking-[0.15em] text-white/70 sm:text-sm sm:tracking-[0.3em]">
            <span className="sm:hidden">{it.mobile}</span>
            <span className="hidden sm:inline">{it.desktop}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
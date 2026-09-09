import { useEffect, useState } from "react";
import { WEDDING_DATE } from "../../components/Pages/Wedding";

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = WEDDING_DATE.getTime() - now;

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
          {/* Numbers */}
          <div className="text-3xl font-semibold text-[var(--gold)] [font-family:var(--font-sans)] sm:text-5xl">
            {String(it.v).padStart(2, "0")}
          </div>

          {/* Labels */}
          <div className="mt-1 font-display text-[10px] font-light uppercase tracking-[0.15em] text-white/70 sm:text-sm sm:tracking-[0.3em]">
            <span className="sm:hidden">{it.mobile}</span>
            <span className="hidden sm:inline">{it.desktop}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

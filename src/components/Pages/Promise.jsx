import { useEffect, useRef, useState } from "react";
import Image from "../../assets/MuyiwaEtDebbyImg8.jpeg";
import { GROOM, BRIDE } from "./Wedding";
import Logo from "../../assets/MuyiwaLogo-2.png";

const LINES = [
  "Two souls, one direction.",
  "What God joins, love holds.",
  "Every heartbeat, a promise.",
  "Not the end of searching,",
  "but the start of forever.",
];

const INTERVAL_MS = 3000;

export default function Promise() {
  const [activeLine, setActiveLine] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const scrollRef = useRef(null);
  const rafRef = useRef(null);

  /* ── visibility observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── auto-advance ── */
  useEffect(() => {
    if (!isVisible) return;
    const id = setInterval(
      () => setActiveLine((p) => (p + 1) % LINES.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [isVisible]);

  /* ── scroll active line to vertical center (rAF-batched) ── */
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const container = scrollRef.current;
      const el = lineRefs.current[activeLine];
      if (!container || !el) return;

      const containerMid = container.clientHeight / 2;
      const elTop = el.offsetTop;
      const elMid = el.clientHeight / 2;

      container.scrollTo({
        top: elTop - containerMid + elMid,
        behavior: "smooth",
      });
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeLine]);

  return (
    <section
      ref={sectionRef}
      id="promise"
      className="relative h-screen overflow-hidden"
      style={{ contain: "layout paint" }}
    >
      {/* Background image */}
      <img
        src={Image}
        alt={`${GROOM} & ${BRIDE}`}
        className="absolute inset-0 h-full w-full object-cover object-[center_28%] select-none pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      />

      {/* Dual gradient — dark at bottom for names, subtle at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* ── Spotify lyrics stage ── */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-hidden flex flex-col justify-center px-6 md:px-20"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 z-10
        bg-gradient-to-b from-black/60 to-transparent"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 z-10
        bg-gradient-to-t from-black/80 to-transparent"
        />

        <div className="space-y-5 py-40">
          {LINES.map((line, i) => {
            const isActive = i === activeLine;
            const isPast = i < activeLine;

            return (
              <p
                key={line}
                ref={(el) => (lineRefs.current[i] = el)}
                onClick={() => setActiveLine(i)}
                className="font-display leading-tight cursor-pointer origin-left"
                style={{
                  pointerEvents: "auto",
                  fontSize: "clamp(1rem, 2.2vw, 1.6rem)", // fixed base size, no reflow
                  fontWeight: 300,
                  color: isActive
                    ? "#ffffff"
                    : isPast
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(255,255,255,0.18)",
                  transform: isActive
                    ? "scale(1.7) translateX(0)" // ~matches old active fontSize ratio
                    : "scale(1) translateX(0)",
                  letterSpacing: isActive ? "0.01em" : "0.02em",
                  textShadow: isActive
                    ? "0 0 24px rgba(255,255,255,0.15)"
                    : "none",
                  transition:
                    "transform 700ms ease-in-out, color 700ms ease-in-out, text-shadow 700ms ease-in-out",
                  willChange: "transform",
                }}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>

      {/* ── Bottom: progress + names ── */}
      <div className=" absolute inset-x-0 bottom-0 z-20 flex flex-col items-center pb-5 md:pb-14 px-6 ">
        <div className="w-full max-w-xs h-px bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--gold)] rounded-full transition-all ease-linear"
              style={{
                width: `${((activeLine + 1) / LINES.length) * 100}%`,
                transitionDuration: `${INTERVAL_MS}ms`,
              }}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <img
              src={Logo}
              alt={`${GROOM} & ${BRIDE}`}
              className="w-32 h-32 md:w-56 md:h-56 object-contain "
            />
          </div>
        {/* <h2 className="font-display text-3xl md:text-5xl font-light text-white tracking-wide text-center">
          {GROOM}
          <span className="mx-3 text-[var(--gold)]">&amp;</span>
          {BRIDE}
        </h2> */}

        <div className=" flex items-center gap-4 opacity-60">
          <span className="h-px w-12 bg-[var(--gold)]" />
          <span className="text-sm text-[var(--gold)]">✦</span>
          <span className="h-px w-12 bg-[var(--gold)]" />
        </div>
      </div>
    </section>
  );
}

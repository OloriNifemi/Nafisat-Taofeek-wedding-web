import { useEffect, useRef, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { Eyebrow, SectionTitle } from "../Ui/Ui";
import { VENUE } from "../Pages/Wedding";

// Static — VENUE doesn't change at runtime, no need to recompute per render
const QUERY = encodeURIComponent(VENUE);

// NOTE: Uber's deep link genuinely supports a prefilled dropoff via query params.
// Bolt and inDrive do not expose an equivalent public "destination" param for web
// links, so those two just open the app/site — the destination still has to be
// entered by hand once there.
const RIDES = [
  {
    name: "Open Map",
    url: `https://www.google.com/maps/search/?api=1&query=${QUERY}`,
    color: "bg-[var(--ink)] text-white",
  },
  // {
  //   name: "Uber",
  //   url: `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${QUERY}&dropoff[nickname]=Wedding%20Venue`,
  //   color: "bg-black text-white",
  // },
  {
    name: "Bolt",
    url: "https://bolt.eu/en-us/",
    color: "bg-[#34D186] text-white",
  },
  {
    name: "inDrive",
    url: "https://indrive.com/",
    color: "bg-[#C1F11D] text-black",
  },
];

const TOAST_DURATION = 2200;

export default function GettingThere() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'copied' | 'error'
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const showToast = (nextStatus) => {
    clearTimeout(timeoutRef.current);
    setStatus(nextStatus);
    timeoutRef.current = setTimeout(() => setStatus("idle"), TOAST_DURATION);
  };

  const copyVenue = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(VENUE);
      } else {
        // Fallback for browsers/contexts without the async Clipboard API
        const textarea = document.createElement("textarea");
        textarea.value = VENUE;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast("copied");
    } catch (err) {
      showToast("error");
    }
  };

  return (
    <section
      id="getting-there"
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <Eyebrow>Find us</Eyebrow>
        <SectionTitle>Getting There</SectionTitle>
      </div>

      <div className="rounded-2xl overflow-hidden border border-[var(--gold)]/30 shadow-[var(--shadow-luxe)] aspect-[16/9]">
        <iframe
          title="Venue location map"
          src={`https://www.google.com/maps?q=${QUERY}&output=embed`}
          className="w-full h-full"
          loading="lazy"
        />
      </div>

      <div
        role="list"
        aria-label="Ways to get to the venue"
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {RIDES.map((r) => (
          <a
            key={r.name}
            role="listitem"
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${r.color} text-center py-4 text-[11px] tracking-[0.3em] uppercase rounded-xl hover:opacity-90 transition-opacity`}
          >
            {r.name}
          </a>
        ))}
      </div>

      <button
        onClick={copyVenue}
        className="mt-6 w-full flex items-center justify-center gap-2 py-4 text-[11px] uppercase tracking-[0.3em] text-[var(--gold-deep)] transition-all duration-300 hover:text-[var(--ink)]"
      >
        <Copy size={14} strokeWidth={2} />
        Copy Venue Address
      </button>

      {/* Toast popup */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 bottom-8 z-[100] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          status !== "idle"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className={` w-60 flex justify-center items-center gap-2 rounded-full text-white px-6 py-3 shadow-[var(--shadow-luxe)] border ${
            status === "error"
              ? "bg-red-500/90 border-red-300/30"
              : "bg-[var(--ink)] border-[var(--gold)]/30"
          }`}
        >
          {status === "error" ? (
            <X size={16} strokeWidth={2.5} />
          ) : (
            <Check size={16} strokeWidth={2.5} className="text-[var(--gold)]" />
          )}
          <span className="text-[11px] text-center uppercase tracking-[0.3em]">
            {status === "error" ? "Couldn't copy" : "Venue Copied!"}
          </span>
        </div>
      </div>
    </section>
  );
}

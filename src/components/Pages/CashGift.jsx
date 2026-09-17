import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Eyebrow, SectionTitle } from "../Ui/Ui";

const TOAST_DURATION = 2200;

export default function CashGift() {
  const accountNumber = "51559811";
  const [status, setStatus] = useState("idle"); // 'idle' | 'copied' | 'error'
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copyAccount = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(accountNumber);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = accountNumber;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      clearTimeout(timeoutRef.current);
      setStatus("copied");
      timeoutRef.current = setTimeout(() => setStatus("idle"), TOAST_DURATION);
    } catch (err) {
      clearTimeout(timeoutRef.current);
      setStatus("error");
      timeoutRef.current = setTimeout(() => setStatus("idle"), TOAST_DURATION);
    }
  };

  return (
    <section
      id="cashgift"
      className="py-20 md:py-24 px-6 md:px-10 bg-[var(--ivory)]"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <Eyebrow>With Love</Eyebrow>

          <SectionTitle>Cash Gift</SectionTitle>

          <p className="mt-3 w-full mx-auto text-sm md:text-base text-gray-600 leading-6 md:leading-7">
            Your presence is the greatest gift we could ever ask for. Should you
            wish to bless us further, a monetary gift towards our new journey
            together would be sincerely appreciated.
          </p>
        </div>

        {/* Card */}
        <div
          className="
            rounded-[30px]
            border
            border-[var(--gold)]/20
            bg-white/70
            shadow-sm
            p-6
            md:p-10
          "
        >
          <div className="space-y-5 text-center">
            {/* Account Name */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">
                Account Name
              </p>

              <h3 className="mt-1 font-display text-xl md:text-2xl font-light text-[var(--ink)]">
                Nafisat Dahunsi
              </h3>
            </div>

            {/* Bank */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">
                Sort code
              </p>

              <h3 className="mt-1 text-xl md:text-2xl font-light text-[var(--ink)]">
                04-29-09
              </h3>
            </div>

            {/* Account Number */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">
                Account Number
              </p>

              <h2 className="mt-2 text-2xl md:text-4xl font-semibold tracking-[0.12em] md:tracking-[0.15em] text-[var(--ink)] break-all">
                {accountNumber}
              </h2>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyAccount}
              disabled={status === "copied"}
              className={`
                mt-2
                w-full
                flex items-center justify-center gap-2
                rounded-xl
                border
                py-3.5 md:py-3
                text-[10px]
                md:text-[11px]
                uppercase
                tracking-[0.25em]
                md:tracking-[0.35em]
                transition-all duration-300
                active:scale-[0.98]
                ${
                  status === "copied"
                    ? "bg-[var(--gold)] border-[var(--gold)] text-white cursor-default"
                    : status === "error"
                      ? "bg-white border-red-300 text-red-500"
                      : "bg-white border-[var(--gold)]/20 text-[var(--gold-deep)] hover:bg-[var(--gold)] hover:text-white"
                }
              `}
            >
              {status === "copied" ? (
                <>
                  <Check size={14} strokeWidth={2.5} />
                  Copied to Clipboard
                </>
              ) : status === "error" ? (
                "Couldn't copy — select manually"
              ) : (
                <>
                  <Copy size={14} strokeWidth={2} />
                  Copy Account Number
                </>
              )}
            </button>
          </div>
        </div>

        {/* Toast */}
        <div
          role="status"
          aria-live="polite"
          className={`fixed left-1/2 bottom-8 z-[100] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            status === "copied"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex justify-center items-center gap-2 rounded-full bg-[var(--ink)] text-white px-6 py-3 shadow-[var(--shadow-luxe)] border border-[var(--gold)]/30">
            <Check size={16} strokeWidth={2.5} className="text-[var(--gold)]" />
            <span className="text-[11px] uppercase tracking-[0.3em] whitespace-nowrap">
              Account Number Copied!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ChevronDown } from "lucide-react";
import { ACCOUNT_DETAILS } from "../Pages/Gifts";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const TOAST_DURATION = 2200;

export default function GiftCard({ gift, taken, onBuy, onMarkPurchased }) {
  const [showBank, setShowBank] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copyAccountNumber = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(ACCOUNT_DETAILS.accountNumber);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = ACCOUNT_DETAILS.accountNumber;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      clearTimeout(timeoutRef.current);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), TOAST_DURATION);
    } catch (err) {
      // Silently ignore — user can still select/copy the number manually.
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--gold)]/15 bg-[#fcfaf7] shadow-sm transition-shadow duration-500 hover:shadow-[var(--shadow-luxe)]"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={gift.image}
            alt={gift.name}
            loading="lazy"
            className={`max-h-[85%] max-w-[85%] object-contain transition-transform duration-700 ease-out group-hover:scale-105 ${
              taken ? "grayscale opacity-60" : ""
            }`}
          />

          {taken && (
            <div className="absolute top-4 right-4 rounded-full bg-[var(--gold)] px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-white shadow">
              Gifted ❤️
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-center font-display text-[20px] font-light leading-snug text-[var(--ink)]">
          {gift.name}
        </h3>

        <div className="mx-auto my-1.5 h-px w-8 bg-[var(--gold)]/30" />

        <p className="text-center text-sm leading-6 text-gray-500">
          {gift.description}
        </p>

        <p className="mt-1 text-center text-[12px] font-medium text-[var(--gold-deep)]">
          {gift.price}
        </p>

        {/* Buttons */}
        <div className="mt-auto space-y-1.5 pt-3">
          {/* Gift This — always opens the product/listing URL, unchanged */}
          <button
            onClick={() => onBuy(gift)}
            disabled={taken}
            className="
              w-full
              rounded-xl
              bg-black
              py-3
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white
              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:-translate-y-1
              hover:bg-[var(--gold-deep)]
              hover:shadow-[0_12px_30px_rgba(184,149,95,0.28)]
              active:translate-y-0
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:bg-gray-500
              disabled:hover:bg-gray-500
              disabled:hover:translate-y-0
              disabled:hover:shadow-none
            "
          >
            {taken ? "Already Gifted" : "Gift This"}
          </button>

          {/* Second button: bank-details dropdown for the car, normal "I've Purchased This" for everything else. */}
          {gift.showBankTransfer ? (
            <div>
              <button
                onClick={() => setShowBank((v) => !v)}
                disabled={taken}
                aria-expanded={showBank}
                className="
                    w-full flex items-center justify-center gap-2
                    rounded-xl border border-[var(--gold)] bg-transparent
                    py-3.5 sm:py-3 px-3
                    text-[10px] sm:text-[11px]
                    uppercase tracking-[0.2em] sm:tracking-[0.35em]
                    text-[var(--gold-deep)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:-translate-y-1 hover:bg-[var(--gold)] hover:text-white
                    hover:shadow-[0_12px_30px_rgba(184,149,95,0.18)]
                    active:translate-y-0 active:scale-[0.98]
                    disabled:cursor-not-allowed disabled:opacity-40
                    disabled:hover:bg-transparent disabled:hover:text-[var(--gold-deep)]
                    disabled:hover:translate-y-0 disabled:hover:shadow-none
                "
              >
                <span className="whitespace-nowrap">
                  {taken ? "Gift Confirmed" : "Bank Transfer"}
                </span>
                {!taken && (
                  <ChevronDown
                    size={14}
                    className={`shrink-0 transition-transform duration-300 ${
                      showBank ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              <AnimatePresence initial={false}>
                {showBank && !taken && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-xl border border-[var(--gold)]/30 bg-white p-4 sm:p-4 text-left">
                      <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:block sm:gap-0">
                        <div>
                          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gray-400">
                            Bank
                          </p>
                          <p className="mt-0.5 text-sm text-[var(--ink)] sm:mb-2">
                            {ACCOUNT_DETAILS.bank}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gray-400">
                            Account Name
                          </p>
                          <p className="mt-0.5 text-sm text-[var(--ink)] sm:mb-2 break-words">
                            {ACCOUNT_DETAILS.accountName}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--gold)]/15">
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gray-400">
                          Account Number
                        </p>
                        <div className="mt-1 flex items-center justify-between gap-3">
                          <span className="text-base sm:text-sm font-medium tracking-wide text-[var(--ink)]">
                            {ACCOUNT_DETAILS.accountNumber}
                          </span>
                          <button
                            onClick={copyAccountNumber}
                            className="
                                flex items-center gap-1.5 shrink-0
                                rounded-lg border border-[var(--gold)]/40
                                px-3 py-2 sm:px-0 sm:py-0 sm:border-0
                                text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em]
                                text-[var(--gold-deep)] hover:text-white hover:bg-[var(--gold-deep)] sm:hover:bg-transparent sm:hover:text-[var(--ink)]
                                transition-colors
                            "
                          >
                            {copied ? (
                              <Check size={13} strokeWidth={2.5} />
                            ) : (
                              <Copy size={13} strokeWidth={2} />
                            )}
                            <span className="whitespace-nowrap">
                              {copied ? "Copied!" : "Copy"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => onMarkPurchased(gift)}
              disabled={taken}
              className="
                w-full
                rounded-xl
                border
                border-[var(--gold)]
                bg-transparent
                py-3
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-[var(--gold-deep)]
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-1
                hover:bg-[var(--gold)]
                hover:text-white
                hover:shadow-[0_12px_30px_rgba(184,149,95,0.18)]
                active:translate-y-0
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:hover:bg-transparent
                disabled:hover:text-[var(--gold-deep)]
                disabled:hover:translate-y-0
                disabled:hover:shadow-none
              "
            >
              {taken ? "Gift Confirmed" : "I've Purchased This"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

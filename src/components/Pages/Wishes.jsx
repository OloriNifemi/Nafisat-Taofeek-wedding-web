import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Eyebrow, SectionTitle } from "../Ui/Ui";
import { client } from "../../lib/sanityClient";

const WISHES_QUERY = `*[_type == "wish"] | order(createdAt desc){ _id, name, text, createdAt }`;
const PREVIEW_COUNT = 3;

export default function Wishes() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const loadWishes = async () => {
    try {
      const data = await client.fetch(WISHES_QUERY);
      setList(data);
    } catch (err) {
      console.error("Failed to load wishes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadWishes = async () => {
      try {
        const data = await client.fetch(WISHES_QUERY);
        if (!ignore) setList(data);
      } catch (err) {
        if (!ignore) console.error("Failed to load wishes:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadWishes();

    return () => {
      ignore = true;
    };
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/submit-wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), text: text.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit wish");
      }

      setName("");
      setText("");
      await loadWishes();
    } catch (err) {
      console.error("Failed to submit wish:", err);
      setSubmitError("Couldn't send your wish — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const preview = list.slice(0, PREVIEW_COUNT);

  return (
    <section
      id="wishes"
      className="py-24 md:py-32 px-6 md:px-10 max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <Eyebrow>Your words, our keepsake</Eyebrow>
        <SectionTitle>Guest Wishes</SectionTitle>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <form onSubmit={add} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={submitting}
            className="w-full bg-transparent border-b border-[var(--gold)]/40 focus:border-[var(--gold)] py-3 outline-none disabled:opacity-50"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a heartfelt wish…"
            rows={4}
            disabled={submitting}
            className="w-full bg-transparent border-b border-[var(--gold)]/40 focus:border-[var(--gold)] py-3 outline-none resize-none disabled:opacity-50"
          />
          {submitError && (
            <p className="text-sm text-red-500 text-center">{submitError}</p>
          )}
          <div className="flex justify-center items-center">
            <button
              disabled={submitting}
              className="px-8 py-3 text-xs tracking-[0.3em] rounded-md uppercase border border-[var(--gold)] text-[var(--gold-deep)] hover:bg-[var(--gold)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Sending…" : "Send wish"}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {loading ? (
            <div className="rounded-2xl border border-dashed border-[var(--gold)]/30 bg-white/50 p-10 text-center">
              <p className="text-gray-500">Loading wishes…</p>
            </div>
          ) : list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--gold)]/30 bg-white/50 p-10 text-center">
              <h3 className="font-display text-2xl mb-3 text-[var(--gold-deep)]">
                No wishes yet
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Be the first to leave a heartfelt message for the couple. Your
                words will become part of their forever memories. 💛
              </p>
            </div>
          ) : (
            <>
              {preview.map((w) => (
                <div
                  key={w._id}
                  className="rounded-xl border border-[var(--gold)]/20 bg-white p-5"
                >
                  <p className="italic font-display">"{w.text}"</p>
                  <p className="mt-3 text-xs tracking-[0.3em] uppercase text-[var(--gold-deep)]">
                    — {w.name}
                  </p>
                </div>
              ))}

              {list.length > PREVIEW_COUNT && (
                <button
                  onClick={() => setShowAll(true)}
                  className="w-full py-3 text-xs tracking-[0.3em] uppercase text-[var(--gold-deep)] border border-[var(--gold)]/40 rounded-xl hover:bg-[var(--gold)] hover:text-white transition-colors"
                >
                  View All Wishes ({list.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAll(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowAll(false)}
                aria-label="Close"
                className="absolute right-5 top-5 text-gray-400 hover:text-black"
              >
                <X size={22} />
              </button>
              <h2 className="font-display text-3xl font-light mb-6 text-center">
                All Wishes
              </h2>
              <div className="space-y-4">
                {list.map((w) => (
                  <div
                    key={w._id}
                    className="rounded-xl border border-[var(--gold)]/20 bg-[#fcfaf7] p-5"
                  >
                    <p className="italic font-display">"{w.text}"</p>
                    <p className="mt-3 text-xs tracking-[0.3em] uppercase text-[var(--gold-deep)]">
                      — {w.name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

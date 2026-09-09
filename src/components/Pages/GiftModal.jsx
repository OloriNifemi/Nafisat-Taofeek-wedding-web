import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER } from "../Pages/Gifts";

const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024; // ~1.5MB

export default function GiftModal({ gift, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [preview, setPreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [step, setStep] = useState("form"); // 'form' | 'confirm' | 'done'
  const [confirming, setConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_BYTES) {
      setImageError("Image is too large — please use one under 1.5MB.");
      setPreview("");
      return;
    }

    setImageError("");
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.onerror = () => setImageError("Couldn't read that file, try again.");
    reader.readAsDataURL(file);
  };

  const nameValid = anonymous || name.trim().length > 0;
  const phoneValid = anonymous || phone.trim().length > 0;
  const canOpenWhatsApp = nameValid && phoneValid && !!preview;

  // Step 1: open WhatsApp with prefilled text. Does NOT mark the gift as
  // taken yet — that only happens after explicit confirmation below.
  const handleOpenWhatsApp = () => {
    if (!canOpenWhatsApp) return;

    const text = encodeURIComponent(
      `🎁 Wedding Gift Confirmation

Gift:
${gift.name}

${anonymous ? "Anonymous Gift ❤️" : `Name: ${name.trim()}\nPhone: ${phone.trim()}`}

${message.trim() ? `Message: ${message.trim()}` : ""}

I'll attach my payment screenshot in this chat.`,
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );

    setStep("confirm");
  };

  // Step 2: only fires when the person explicitly confirms they actually
  // sent the screenshot. This is the point the gift becomes "taken" globally.
  const handleConfirmSent = async () => {
    setConfirming(true);
    setConfirmError("");

    try {
      const res = await fetch("/api/mark-purchased", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftId: gift.id,
          giftName: gift.name,
          anonymous,
          name: anonymous ? "" : name.trim(),
          phone: anonymous ? "" : phone.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to record purchase");
      }

      setStep("done");
    } catch (err) {
      console.error("Failed to confirm gift:", err);
      setConfirmError("Couldn't confirm your gift — please try again.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gift-modal-title"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative outline-none max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 text-2xl text-gray-400 hover:text-black"
          >
            ×
          </button>

          {step === "form" && (
            <>
              <h2 id="gift-modal-title" className="font-display text-3xl font-light mb-2">
                Confirm Your Gift
              </h2>
              <p className="text-gray-500 mb-8">{gift.name}</p>

              <div className="space-y-5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={() => setAnonymous(!anonymous)}
                  />
                  <span className="text-sm">Gift anonymously</span>
                </label>

                {!anonymous && (
                  <>
                    <input
                      id="gift-name"
                      name="giftName"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-[var(--gold)]/30 px-4 py-3"
                    />
                    <input
                      id="gift-phone"
                      name="giftPhone"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-[var(--gold)]/30 px-4 py-3"
                    />
                  </>
                )}

                <textarea
                  id="gift-message"
                  name="giftMessage"
                  rows={3}
                  placeholder="Leave a message for the couple..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-[var(--gold)]/30 px-4 py-3 resize-none"
                />

                <div>
                  <label htmlFor="gift-screenshot" className="block mb-2 text-sm text-gray-500">
                    Upload Payment Screenshot
                  </label>
                  <input
                    id="gift-screenshot"
                    name="giftScreenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    This is just a preview for you — you'll attach it manually once WhatsApp opens.
                  </p>
                  {imageError && <p className="mt-2 text-sm text-red-500">{imageError}</p>}
                  {preview && (
                    <img
                      src={preview}
                      alt="Payment screenshot preview"
                      className="mt-4 rounded-xl border max-h-52 object-contain"
                    />
                  )}
                </div>

                <button
                  onClick={handleOpenWhatsApp}
                  disabled={!canOpenWhatsApp}
                  className="w-full py-4 bg-[var(--gold)] text-white tracking-[0.35em] uppercase text-[11px] rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Open WhatsApp
                </button>
                {!preview && (
                  <p className="text-xs text-gray-400 text-center -mt-2">
                    Add a payment screenshot to continue
                  </p>
                )}
              </div>
            </>
          )}

          {step === "confirm" && (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">📲</div>
              <h2 className="font-display text-3xl mb-4">One Last Step</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                WhatsApp has opened with your details already filled in.
                Attach the screenshot you previewed, then hit send.
                <br />
                <br />
                Once you've actually sent it, tap the button below to
                confirm — this is what lets us mark the gift as taken.
              </p>

              {confirmError && (
                <p className="text-sm text-red-500 mb-4">{confirmError}</p>
              )}

              <button
                onClick={handleConfirmSent}
                disabled={confirming}
                className="w-full py-4 bg-[var(--gold)] text-white tracking-[0.35em] uppercase text-[11px] rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {confirming ? "Confirming..." : "Yes, I've Sent It"}
              </button>
              <button
                onClick={onClose}
                className="mt-3 w-full py-3 text-[11px] tracking-[0.3em] uppercase text-gray-400 hover:text-gray-600 transition"
              >
                Not yet — I'll do this later
              </button>
            </div>
          )}

          {step === "done" && (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">💛</div>
              <h2 className="font-display text-3xl mb-4">Thank You!</h2>
              <p className="text-gray-600 leading-relaxed">
                Your gift has been recorded. Muyiwa and Debby are so grateful
                for your generosity.
              </p>
              <button
                onClick={onClose}
                className="mt-8 px-6 py-3 border border-[var(--gold)] text-[11px] tracking-[0.35em] uppercase hover:bg-[var(--gold)] hover:text-white transition"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
import { useCallback, useEffect, useState } from "react";
import { Eyebrow, SectionTitle } from "../Ui/Ui";
import { GIFTS } from "../Pages/Gifts";
import { client } from "../../lib/sanityClient";
import GiftCard from "../Pages/GiftCard";
import GiftModal from "../Pages/GiftModal";

const PURCHASES_QUERY = `*[_type == "giftPurchase"]{ giftId }`;

export default function Registry() {
  const [bought, setBought] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState(null);

  const loadPurchases = useCallback(async (signal) => {
    try {
      const data = await client.fetch(PURCHASES_QUERY);
      if (signal?.aborted) return;
      const map = {};
      data.forEach((p) => {
        map[p.giftId] = true;
      });
      setBought(map);
    } catch (err) {
      if (!signal?.aborted) console.error("Failed to load purchases:", err);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    // Wrap in an async IIFE so the effect body itself never calls setState
    // directly — it just kicks off an async task, and loadPurchases guards
    // its own setState calls against the abort signal internally.
    (async () => {
      await loadPurchases(controller.signal);
    })();

    return () => controller.abort();
  }, [loadPurchases]);

  const openJumia = (gift) => {
    window.open(gift.url, "_blank", "noopener,noreferrer");
  };

  const closeModal = () => {
    setSelectedGift(null);
    loadPurchases(); // refresh from Sanity so the just-confirmed gift shows as taken
  };

  return (
    <section id="registry" className="py-24 md:py-32 px-6 md:px-10 bg-[var(--ivory)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>With gratitude</Eyebrow>
          <SectionTitle>Gift Registry</SectionTitle>
          <p className="mt-4 max-w-xl mx-auto text-gray-600 leading-relaxed">
            Your love and prayers mean the world to us. If you'd like to bless
            our new home, we've put together a few gifts we'd truly appreciate.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading gifts…</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GIFTS.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                taken={!!bought[gift.id]}
                onBuy={openJumia}
                onMarkPurchased={setSelectedGift}
              />
            ))}
          </div>
        )}
      </div>

      {selectedGift && <GiftModal gift={selectedGift} onClose={closeModal} />}
    </section>
  );
}
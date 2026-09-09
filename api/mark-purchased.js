import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2026-03-01",
  token: process.env.SANITY_WRITE_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { giftId, giftName, anonymous, name, phone, message } = req.body || {};

  if (!giftId) {
    return res.status(400).json({ error: "giftId is required" });
  }

  if (!anonymous && (!name?.trim() || !phone?.trim())) {
    return res.status(400).json({ error: "Name and phone are required unless anonymous" });
  }

  try {
    const doc = await client.create({
      _type: "giftPurchase",
      giftId,
      giftName: giftName || "",
      anonymous: !!anonymous,
      name: anonymous ? "" : (name || "").trim(),
      phone: anonymous ? "" : (phone || "").trim(),
      message: (message || "").trim(),
      createdAt: new Date().toISOString(),
    });
    return res.status(200).json({ success: true, id: doc._id });
  } catch (err) {
    console.error("Sanity write failed:", err);
    return res.status(500).json({ error: "Failed to record purchase" });
  }
}
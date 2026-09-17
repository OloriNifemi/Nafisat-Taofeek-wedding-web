import { createClient } from "@sanity/client";

// This client only exists on the server (Vercel's function runtime).
// The token here is never sent to the browser.
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

  const { name, text } = req.body || {};

  if (!name?.trim() || !text?.trim()) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  // Basic length guards so a malicious request can't dump huge payloads
  // into your dataset.
  if (name.length > 100 || text.length > 1000) {
    return res.status(400).json({ error: "Input too long" });
  }

  try {
    const doc = await client.create({
      _type: "wish",
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    });
    return res.status(200).json({ success: true, id: doc._id });
  } catch (err) {
    console.error("Sanity write failed:", err);
    return res.status(500).json({ error: "Failed to save wish" });
  }
}
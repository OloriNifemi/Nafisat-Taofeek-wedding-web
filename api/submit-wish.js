import { createClient } from "@sanity/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { name, text } = req.body || {};

    if (!name?.trim() || !text?.trim()) {
      return res.status(400).json({
        error: "Name and message are required",
      });
    }

    console.log("ENV CHECK:", {
      projectId: !!process.env.SANITY_PROJECT_ID,
      dataset: !!process.env.SANITY_DATASET,
      token: !!process.env.SANITY_WRITE_TOKEN,
    });

    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      useCdn: false,
      apiVersion: "2026-03-01",
      token: process.env.SANITY_WRITE_TOKEN,
    });

    console.log("SANITY CLIENT CREATED");

    const doc = await client.create({
      _type: "wish",
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    });

    console.log("WISH CREATED:", doc._id);

    return res.status(200).json({
      success: true,
      id: doc._id,
    });
  } catch (err) {
    console.error("SANITY ERROR:", err);

    return res.status(500).json({
      error: err?.message || String(err),
    });
  }
}
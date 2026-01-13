// backend/src/routes/aiDispatch.js

const express = require("express");
const router = express.Router();
const { detectIncident } = require("../utils/detectIncident");

/**
 * POST /api/ai/detect
 * Accepts JSON: { text: "some incident description" }
 * Returns: { incidentType, instructions }
 */
router.post("/detect", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Call your incident detection logic
    const result = await detectIncident(text);

    res.json({
      success: true,
      inputText: text,
      incidentType: result.incidentType,
      instructions: result.instructions,
    });
  } catch (error) {
    console.error("Error in /detect:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/ai/detect-batch
 * Accepts JSON: { items: [ { text: "incident1" }, { text: "incident2" }, ... ] }
 * Returns: Array of results for each input
 */
router.post("/detect-batch", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res
        .status(400)
        .json({ error: "Invalid input. 'items' array is required." });
    }

    const results = [];
    for (const item of items) {
      if (!item.text) continue; // skip invalid entries
      const result = await detectIncident(item.text);
      results.push({ inputText: item.text, ...result });
    }

    res.json(results);
  } catch (error) {
    console.error("Error in /detect-batch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

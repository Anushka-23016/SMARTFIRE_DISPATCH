// src/utils/zeroShotUtils.js
const fetch = require("node-fetch");

const HF_API_KEY = process.env.HF_API_KEY;
const ZERO_SHOT_MODEL = "facebook/bart-large-mnli";

/**
 * Zero-Shot Classification using Hugging Face
 * @param {string} text - Input text
 * @param {string[]} labels - Possible incident types
 * @returns {Promise<string>} - Predicted incident type
 */
async function zeroShotClassify(text, labels = ["fire", "gas leak", "chemical spill", "accident"]) {
  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${ZERO_SHOT_MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: { candidate_labels: labels }
      }),
    });

    const data = await response.json();

    // Hugging Face returns something like: { labels: [...], scores: [...] }
    return data.labels[0]; // highest score label
  } catch (err) {
    console.error("Zero-shot classification error:", err);
    return "unknown";
  }
}

module.exports = { zeroShotClassify };

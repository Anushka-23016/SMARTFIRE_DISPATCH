// src/utils/embeddingUtils.js
const fetch = require("node-fetch");

const HF_API_KEY = process.env.HF_API_KEY;
const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";

/**
 * Convert text into an embedding vector using Hugging Face
 * @param {string} text
 * @returns {Promise<number[]>} - Embedding vector
 */
async function getTextEmbedding(text) {
  try {
    const response = await fetch(`https://api-inference.huggingface.co/pipeline/feature-extraction/${EMBEDDING_MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([text]),
    });

    const data = await response.json();

    // HF returns a nested array: [[embedding_values]]
    return data[0];
  } catch (err) {
    console.error("Error fetching embedding:", err);
    return [];
  }
}

/**
 * Compute cosine similarity between two vectors
 */
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

module.exports = { getTextEmbedding, cosineSimilarity };

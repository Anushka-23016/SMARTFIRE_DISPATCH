const express = require("express");
const router = express.Router();

// Import your utility in CommonJS style
const { detectIncident } = require("../utils/detectIncident");

router.post("/dispatch", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const result = detectIncident(text);

  res.json({
    success: true,
    inputText: text,
    incidentType: result.incidentType,
    instructions: result.instructions
  });
});

module.exports = router;

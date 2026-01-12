import Incident from "../models/Incident.js";

export const analyzeIncident = async (req, res) => {
  try {
    const { keywords, severity } = req.body;

    const matches = await Incident.find({
      keyword: { $in: keywords }
    });

    res.json({
      success: true,
      severity,
      matchedActions: matches
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

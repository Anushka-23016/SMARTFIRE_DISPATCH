// controllers/incidentController.js
const CallTranscript = require('../models/CallTranscript');
const OperationsHistory = require('../models/OperationsHistory');
const IncidentType = require('../models/IncidentType');
// huggingface, embeddings etc
const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HF_API_KEY);

exports.processIncident = async (req, res) => {
  try {
    const { text } = req.body;

    // 1️⃣ Extract structured info
    const peopleMatch = text.match(/\b\d+\b/); // crude number extraction
    const people = peopleMatch ? parseInt(peopleMatch[0]) : 1;

    const severityMatch = text.match(/high|medium|low/i);
    const severity = severityMatch ? severityMatch[0].toLowerCase() : "unknown";

    // 2️⃣ Determine incident type
    let incidentType;

    // Try known keywords from DB
    const knownTypes = await IncidentType.find();
    for (let type of knownTypes) {
      const regex = new RegExp(type.name, "i");
      if (regex.test(text)) {
        incidentType = type;
        break;
      }
    }

    // 2a. If unknown, use Zero-Shot Classification
    if (!incidentType) {
      const result = await hf.zeroShotClassification({
        model: "facebook/bart-large-mnli",
        inputs: text,
        parameters: { candidate_labels: knownTypes.map(t => t.name) }
      });
      const bestLabel = result.labels[0];
      incidentType = knownTypes.find(t => t.name === bestLabel);
    }

    // 3️⃣ Fetch instructions (either from DB for known type, or default)
    const instructions = incidentType?.instructions || ["Follow standard safety protocols"];

    // 4️⃣ Save CallTranscript
    const callRecord = await CallTranscript.create({
      transcript: text,
      incident_type: incidentType?.name || "Unknown",
      severity,
      people
    });

    // 5️⃣ Save OperationsHistory
    await OperationsHistory.create({
      call_id: callRecord._id,
      incident_type_id: incidentType?._id || null,
      assigned_trucks: [],
      assigned_personnel: [],
      assigned_equipment: [],
      status: "Ongoing"
    });

    res.json({
      transcript: text,
      people,
      severity,
      incidentType: incidentType?.name || "Unknown",
      instructions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

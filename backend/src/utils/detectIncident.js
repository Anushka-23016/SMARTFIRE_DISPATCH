const IncidentType = require("../models/IncidentType"); // your DB model
const { getEmbedding } = require("./embeddingUtils");   // utility for semantic similarity
const { zeroShotClassify } = require("./zeroShotUtils"); // utility for unknown incident detection

const incidentInstructions = {
  fire: ["Alert fire brigade", "Evacuate building", "Shut off electricity"],
  "gas leak": ["Alert chemical safety", "Evacuate immediately", "Seal area"],
  "chemical spill": ["Alert hazardous team", "Evacuate area", "Use PPE"],
  accident: ["Call ambulance", "Evacuate injured", "Report to control room"],
};

async function detectIncident(text) {
  let incidentType;
  let instructions;

  // Step 1: Try to match known incidents in DB
  const knownIncidents = await IncidentType.find();
  const matched = knownIncidents.find(inc =>
    text.toLowerCase().includes(inc.keyword.toLowerCase())
  );

  if (matched) {
    incidentType = matched.name;
    instructions = incidentInstructions[incidentType] || [];
  } else {
    // Step 2: Unknown incident → use Zero-Shot Classification
    incidentType = await zeroShotClassify(text);
    instructions = incidentInstructions[incidentType] || ["Follow default safety protocol"];
  }

  return { incidentType, instructions };
}

module.exports = { detectIncident };

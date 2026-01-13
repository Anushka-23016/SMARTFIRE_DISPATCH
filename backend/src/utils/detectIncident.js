const IncidentType = require("../model/IncidentType");
const { getTextEmbedding } = require("./embeddingUtils");
const { zeroShotClassify } = require("./zeroShotUtils");

const incidentInstructions = {
  fire: ["Alert fire brigade", "Evacuate building", "Shut off electricity"],
  "gas leak": ["Alert chemical safety", "Evacuate immediately", "Seal area"],
  "chemical spill": ["Alert hazardous team", "Evacuate area", "Use PPE"],
  accident: ["Call ambulance", "Evacuate injured", "Report to control room"],
};

async function detectIncident(text) {
  let incidentType;
  let instructions;

  const knownIncidents = await IncidentType.find();

  // Step 1: Try to match keywords in DB
  const matched = knownIncidents.find(inc =>
    text.toLowerCase().includes(inc.keyword.toLowerCase())
  );

  if (matched) {
    incidentType = matched.name;
    instructions = incidentInstructions[incidentType] || [];
  } else {
    // Step 2: Unknown → zero-shot classification using Hugging Face
    incidentType = await zeroShotClassify(text);
    instructions = incidentInstructions[incidentType] || ["Follow default safety protocol"];
  }

  return { incidentType, instructions };
}

module.exports = { detectIncident };

import { incidentInstructions } from "./incidentInstructions.js";

export function detectIncident(text) {
  const lowerText = text.toLowerCase();

  for (const [type, data] of Object.entries(incidentInstructions)) {
    for (const keyword of data.keywords) {
      if (lowerText.includes(keyword)) {
        return {
          incidentType: type,
          instructions: data.instructions
        };
      }
    }
  }

  return {
    incidentType: "unknown",
    instructions: [
      "Escalate to control room",
      "Request manual verification",
      "Dispatch nearest available unit"
    ]
  };
}

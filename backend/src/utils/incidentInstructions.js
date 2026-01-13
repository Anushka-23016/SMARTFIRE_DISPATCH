export const incidentInstructions  = {
  fire: {
    keywords: ["fire", "aag", "burn", "blast", "explosion"],
    instructions: [
      "Alert fire brigade immediately",
      "Evacuate building",
      "Shut off electricity",
      "Dispatch 2 fire trucks"
    ]
  },

  gas_leak: {
    keywords: ["gas", "cylinder", "leak", "smell"],
    instructions: [
      "Alert gas emergency team",
      "Evacuate immediately",
      "Do not operate switches",
      "Seal affected area"
    ]
  },

  chemical: {
    keywords: ["chemical", "factory", "toxic", "spill"],
    instructions: [
      "Alert hazardous material team",
      "Evacuate nearby area",
      "Use PPE",
      "Isolate contamination zone"
    ]
  }
};

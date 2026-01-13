import React from "react";
import DispatchDisplay from "./DispatchDisplay";

function App() {
  const dispatchData = {
    vehicleType: ["Fire Truck", "Hazmat Van"],
    equipment: ["Fire Extinguishers", "Protective Suits", "Gas Masks"],
    employees: 5,
    suggestions: [
      "Evacuate the area immediately",
      "Ensure chemical containment measures",
      "Send first responders with protective gear",
      "Alert nearby hospitals for emergency support"
    ]
  };

  return (
    <div>
      <DispatchDisplay data={dispatchData} />
    </div>
  );
}

export default App;

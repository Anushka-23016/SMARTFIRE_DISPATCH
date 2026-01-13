import React from "react";

const DispatchDisplay = ({ data }) => {
  if (!data) return <p>No dispatch data available.</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>🚨 Dispatch Information</h2>
      <p><strong>🚒 Vehicle Type:</strong> {data.vehicleType.join(", ")}</p>
      <p><strong>🧰 Equipment Needed:</strong> {data.equipment.join(", ")}</p>
      <p><strong>👥 Number of Employees to Dispatch:</strong> {data.employees}</p>
      <h3>💡 Suggestions:</h3>
      <ul>
        {data.suggestions.map((s, index) => (
          <li key={index}>{s}</li>
        ))}
      </ul>
    </div>
  );
};

export default DispatchDisplay;

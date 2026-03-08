import React from "react";

function Results({ score, explanation, userData }) {

  const generateReport = async () => {

    try {
      const response = await fetch("http://localhost:8000/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      alert("Report generated successfully!");

      console.log(result);

    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div style={{marginTop:"30px"}}>

      <h2>Loan Eligibility Score: {score}</h2>

      <p>{explanation}</p>

      <button onClick={generateReport}>
        📄 Generate Loan Report
      </button>

    </div>
  );
}

export default Results;
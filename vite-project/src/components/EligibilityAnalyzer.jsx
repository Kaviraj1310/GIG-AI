import React, { useState } from "react";
import ScoreTimeline from "./ScoreTimeline";

function EligibilityAnalyzer() {

  const [bankStatement, setBankStatement] = useState(null);
  const [earningsProof, setEarningsProof] = useState(null);
  const [vehicleProof, setVehicleProof] = useState(null);

  const [result, setResult] = useState(null);

  const checkEligibility = () => {

    let score = 0;
    let reasons = [];
    let improvements = [];

    // BANK STATEMENT
    if (bankStatement) {
      score += 40;
    } else {
      reasons.push("Bank statement missing.");
      improvements.push("Upload last 6 months bank statement.");
    }

    // EARNINGS PROOF
    if (earningsProof) {
      score += 35;
    } else {
      reasons.push("Platform earnings proof missing.");
      improvements.push("Upload Swiggy/Uber earnings screenshot.");
    }

    // VEHICLE PROOF
    if (vehicleProof) {
      score += 25;
    } else {
      improvements.push("Uploading vehicle ownership proof increases approval chances.");
    }

    const eligible = score >= 60;

    const newResult = {
      score,
      eligible,
      reasons,
      improvements,
      date: new Date().toLocaleString()
    };

    setResult(newResult);

    // SAVE TO HISTORY
    const history = JSON.parse(localStorage.getItem("scoreHistory")) || [];

    history.push({
      score: score,
      date: newResult.date
    });

    localStorage.setItem("scoreHistory", JSON.stringify(history));
  };

  return (

    <div className="card analyzerCard">

      <h3>Loan Eligibility Check</h3>

      <label>Upload Bank Statement</label>
      <input
        type="file"
        onChange={(e)=>setBankStatement(e.target.files[0])}
      />

      <label>Upload Platform Earnings (Swiggy/Uber)</label>
      <input
        type="file"
        onChange={(e)=>setEarningsProof(e.target.files[0])}
      />

      <label>Upload Vehicle Ownership Proof (optional)</label>
      <input
        type="file"
        onChange={(e)=>setVehicleProof(e.target.files[0])}
      />

      <button className="connectBtn" onClick={checkEligibility}>
        Check Eligibility
      </button>

      {result && (

        <div className="resultCard">

          {result.eligible ? (
            <h2 style={{color:"#22d3ee"}}>✔ Eligible</h2>
          ) : (
            <h2 style={{color:"#ff5f5f"}}>✖ Not Eligible</h2>
          )}

          <h3>Eligibility Score: {result.score}/100</h3>

          {result.reasons.length > 0 && (
            <>
              <h4>Reasons</h4>
              <ul>
                {result.reasons.map((r,i)=>(
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          )}

          <h4>Improvement Steps</h4>
          <ul>
            {result.improvements.map((i,idx)=>(
              <li key={idx}>{i}</li>
            ))}
          </ul>

        </div>

      )}

      <ScoreTimeline />

    </div>

  );
}

export default EligibilityAnalyzer;
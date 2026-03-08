import React, { useState } from "react";

function EligibilityAnalyzer() {

  const [bankStatement, setBankStatement] = useState(null);
  const [earningsProof, setEarningsProof] = useState(null);
  const [vehicleProof, setVehicleProof] = useState(null);

  const [result, setResult] = useState(null);

  const containsKeyword = (file, keywords) => {
    if (!file) return false;

    const name = file.name.toLowerCase();

    return keywords.some(keyword => name.includes(keyword));
  };

  const checkEligibility = () => {

    let score = 0;
    let reasons = [];
    let improvements = [];
    let rejected = false;

    // BANK STATEMENT KEYWORDS (~50)
    const bankKeywords = [
      "bank","statement","account","transaction","deposit","withdrawal","balance",
      "credit","debit","ifsc","branch","passbook","savings","current",
      "statement_of_account","banking","ledger","transfer","payment",
      "upi","neft","rtgs","imps","cheque","interest","charges","fee",
      "monthly","quarterly","bank_record","bank_history","account_summary",
      "transaction_history","bank_document","financial_statement",
      "bank_statement","statement_report","bank_details","balance_sheet",
      "account_activity","banking_record","statement_copy","account_log",
      "financial_log","statement_history","bank_summary"
    ];

    // EARNINGS PROOF KEYWORDS (~50)
    const earningsKeywords = [
      "earnings","income","payout","payment","revenue","salary","wages",
      "gig","platform","delivery","ride","driver","weekly","monthly",
      "income_statement","earnings_report","payment_history","payout_history",
      "transaction_summary","income_log","earnings_log","income_record",
      "uber","ola","swiggy","zomato","rapido","doordash","ubereats",
      "deliveroo","lyft","amazonflex","driver_earnings","delivery_income",
      "platform_income","gig_income","gig_payment","driver_payout",
      "delivery_earnings","ride_earnings","freelance_income",
      "income_receipt","earnings_receipt","income_proof",
      "payment_receipt","gig_report","earnings_statement","income_summary"
    ];

    // VEHICLE PROOF KEYWORDS (~50)
    const vehicleKeywords = [
      "vehicle","registration","rc","rc_book","ownership","vehicle_registration",
      "registration_certificate","vehicle_record","vehicle_document",
      "vehicle_proof","owner","vehicle_owner","registration_details",
      "license_plate","plate","chassis","engine","vehicle_id","vin",
      "transport","car","bike","motorcycle","scooter","auto","truck",
      "commercial_vehicle","vehicle_license","registration_copy",
      "ownership_proof","vehicle_certificate","vehicle_permit",
      "transport_document","vehicle_identity","road_tax","vehicle_tax",
      "insurance","vehicle_insurance","vehicle_policy","permit",
      "transport_authority","rto","motor_vehicle","vehicle_card",
      "vehicle_registration_certificate","registration_record"
    ];

    // BANK STATEMENT CHECK
    if (bankStatement) {

      if (containsKeyword(bankStatement, bankKeywords)) {
        score += 40;
      } else {
        rejected = true;
        reasons.push("Uploaded file is not recognized as a valid bank statement.");
      }

    } else {
      reasons.push("Bank statement missing.");
      improvements.push("Upload last 6 months bank statement.");
    }

    // EARNINGS PROOF CHECK
    if (earningsProof) {

      if (containsKeyword(earningsProof, earningsKeywords)) {
        score += 35;
      } else {
        rejected = true;
        reasons.push("Uploaded document is not recognized as valid platform earnings proof.");
      }

    } else {
      reasons.push("Platform earnings proof missing.");
      improvements.push("Upload Swiggy/Uber earnings screenshot.");
    }

    // VEHICLE PROOF CHECK
    if (vehicleProof) {

      if (containsKeyword(vehicleProof, vehicleKeywords)) {
        score += 25;
      } else {
        rejected = true;
        reasons.push("Uploaded file is not recognized as valid vehicle ownership proof.");
      }

    } else {
      improvements.push("Upload vehicle ownership proof to improve eligibility chances.");
    }

    // Reject analysis if invalid document detected
    if (rejected) {

      setResult({
        rejected: true,
        message: "Analysis rejected because one or more uploaded documents are not relevant.",
        reasons
      });

      return;
    }

    const eligible = score >= 60;

    setResult({
      rejected: false,
      eligible,
      score,
      reasons,
      improvements
    });

  };

  return (
    <div className="card analyzerCard">

      <h3>Loan Eligibility Check</h3>

      <label>Upload Bank Statement</label>
      <input type="file" onChange={(e) => setBankStatement(e.target.files[0])} />

      <label>Upload Platform Earnings (Swiggy/Uber)</label>
      <input type="file" onChange={(e) => setEarningsProof(e.target.files[0])} />

      <label>Upload Vehicle Ownership Proof (optional)</label>
      <input type="file" onChange={(e) => setVehicleProof(e.target.files[0])} />

      <button className="connectBtn" onClick={checkEligibility}>
        Check Eligibility
      </button>

      {result && (
        <div className="resultCard">

          {result.rejected ? (
            <>
              <h2 style={{ color: "#ff5f5f" }}>⚠ Analysis Rejected</h2>
              <p>{result.message}</p>
              <ul>
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              {result.eligible ? (
                <h2 style={{ color: "#22d3ee" }}>✔ Eligible</h2>
              ) : (
                <h2 style={{ color: "#ff5f5f" }}>✖ Not Eligible</h2>
              )}

              <p>Eligibility Score: {result.score}/100</p>

              {result.reasons.length > 0 && (
                <>
                  <h4>Reasons</h4>
                  <ul>
                    {result.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </>
              )}

              <h4>Improvement Steps</h4>
              <ul>
                {result.improvements.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default EligibilityAnalyzer;
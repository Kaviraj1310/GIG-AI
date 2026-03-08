import React, { useState } from "react";

export default function CollateralEstimator() {

  const [assetType, setAssetType] = useState("");
  const [customAsset, setCustomAsset] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const assets = [
    "Vehicle",
    "Mobile Phone",
    "Laptop",
    "Gold",
    "Property",
    "Other"
  ];

  const estimateLoan = async () => {

    if (!value || !assetType) return;

    const asset = assetType === "Other" ? customAsset : assetType;

    const res = await fetch("http://localhost:5000/collateral-estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assetType: asset,
        value: value
      })
    });

    const data = await res.json();

    setResult(data.estimate);
  };

  return (
    <div className="card" style={{ marginTop: "30px" }}>

      <h2>Collateral Estimator</h2>

      {/* Asset Type */}

      <select
        value={assetType}
        onChange={(e) => setAssetType(e.target.value)}
        style={{ padding: "10px", marginTop: "15px", width: "100%" }}
      >
        <option value="">Select Asset Type</option>

        {assets.map((a, i) => (
          <option key={i} value={a}>
            {a}
          </option>
        ))}

      </select>

      {/* Custom Asset */}

      {assetType === "Other" && (

        <input
          type="text"
          placeholder="Enter asset name"
          value={customAsset}
          onChange={(e) => setCustomAsset(e.target.value)}
          style={{ padding: "10px", marginTop: "10px", width: "100%" }}
        />

      )}

      {/* Asset Value */}

      <input
        type="number"
        placeholder="Enter Asset Value ₹"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: "10px", marginTop: "10px", width: "100%" }}
      />

      {/* Button */}

      <button
        onClick={estimateLoan}
        style={{ marginTop: "15px" }}
      >
        Estimate Loan
      </button>

      {/* Result */}

      {result && (

        <div style={{ marginTop: "20px" }}>

          <h3>Estimated Loan Eligibility</h3>

          <p>{result}</p>

        </div>

      )}

    </div>
  );
}
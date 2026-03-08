import React, { useState } from "react";

export default function DocumentChecklist() {

  /* ---------------- PROFILE OPTIONS ---------------- */

  const profileDocs = {
    swiggy: [
      "Aadhaar Card",
      "PAN Card",
      "Bank Statement (6 months)",
      "Swiggy Earnings Screenshot"
    ],
    uber: [
      "Aadhaar Card",
      "PAN Card",
      "Uber Weekly Payout Screenshot",
      "Bank Statement (6 months)"
    ],
    freelancer: [
      "Aadhaar Card",
      "PAN Card",
      "Invoice History",
      "Bank Statement"
    ]
  };

  const profileLabels = {
    swiggy: "Swiggy Partner",
    uber: "Uber Driver",
    freelancer: "Freelancer"
  };

  /* ---------------- STATES ---------------- */

  const [profile, setProfile] = useState("swiggy");
  const [checkedDocs, setCheckedDocs] = useState({});
  const [open, setOpen] = useState(false);

  const docs = profileDocs[profile];

  /* ---------------- TOGGLE CHECK ---------------- */

  const toggleDoc = (doc) => {
    setCheckedDocs({
      ...checkedDocs,
      [doc]: !checkedDocs[doc]
    });
  };

  /* ---------------- PROGRESS ---------------- */

  const completed = docs.filter((doc) => checkedDocs[doc]).length;
  const progress = (completed / docs.length) * 100;

  return (
    <div className="card">

      <h2>Document Readiness Checklist</h2>

      {/* -------- MODERN DROPDOWN -------- */}

      <div className="profileDropdown">

        <div
          className="dropdownHeader"
          onClick={() => setOpen(!open)}
        >
          {profileLabels[profile]}
          <span className={`arrow ${open ? "open" : ""}`}>⌄</span>
        </div>

        {open && (
          <div className="dropdownMenu">

            {Object.keys(profileLabels).map((key) => (

              <div
                key={key}
                className={`dropdownItem ${
                  profile === key ? "active" : ""
                }`}
                onClick={() => {
                  setProfile(key);
                  setCheckedDocs({});
                  setOpen(false);
                }}
              >
                {profileLabels[key]}
              </div>

            ))}

          </div>
        )}

      </div>

      {/* -------- PROGRESS BAR -------- */}

      <div className="progressBar">
        <div
          className="progressFill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>{completed} / {docs.length} Documents Ready</p>

      {/* -------- DOCUMENT CHECKLIST -------- */}

      <div className="docList">

        {docs.map((doc, index) => (

          <label key={index} className="docItem">

            <input
              type="checkbox"
              checked={checkedDocs[doc] || false}
              onChange={() => toggleDoc(doc)}
            />

            {doc}

          </label>

        ))}

      </div>

    </div>
  );
}
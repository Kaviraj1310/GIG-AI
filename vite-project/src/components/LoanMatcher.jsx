import { useState } from "react";

export default function LoanMatcher() {

  const [activeTab, setActiveTab] = useState("personal");

  const loans = [
    {
      bank: "Alpha Global Bank",
      rate: "10.25% p.a.",
      emi: "$245 / mo",
      tenure: "60 Months",
      recommended: false,
      icon: "🏦"
    },
    {
      bank: "Nexus Credit",
      rate: "9.5% p.a.",
      emi: "$210 / mo",
      tenure: "72 Months",
      recommended: true,
      icon: "⚡"
    },
    {
      bank: "Zenith Trust",
      rate: "11.0% p.a.",
      emi: "$260 / mo",
      tenure: "48 Months",
      recommended: false,
      icon: "🏛"
    }
  ];

  return (

    <section className="loanMatcher">

      <h2>Loan Product Matcher</h2>

      <p>
        Handpicked offers based on your AI-calculated reliability score.
      </p>


      {/* Tabs */}

      <div className="loanTabs">

        <button
          className={activeTab === "personal" ? "active" : ""}
          onClick={() => setActiveTab("personal")}
        >
          Personal
        </button>

        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => setActiveTab("home")}
        >
          Home
        </button>

        <button
          className={activeTab === "vehicle" ? "active" : ""}
          onClick={() => setActiveTab("vehicle")}
        >
          Vehicle
        </button>

      </div>


      {/* Table Header */}

      <div className="loanHeader">

        <span>PARTNER BANK</span>
        <span>INTEREST RATE</span>
        <span>EMI (APPROX)</span>
        <span>MAX TENURE</span>
        <span></span>

      </div>


      {/* Loan Rows */}

      {loans.map((loan, index) => (

        <div
          key={index}
          className={`loanRow ${loan.recommended ? "recommended" : ""}`}
        >

          <div className="bank">

            <span className="bankIcon">{loan.icon}</span>

            <div>

              {loan.bank}

              {loan.recommended && (
                <div className="recommendedTag">
                  AI RECOMMENDED
                </div>
              )}

            </div>

          </div>

          <span>{loan.rate}</span>

          <span>{loan.emi}</span>

          <span>{loan.tenure}</span>

          <button
            className={`applyBtn ${
              loan.recommended ? "primary" : ""
            }`}
          >
            Apply
          </button>

        </div>

      ))}

    </section>
  );
}
import { useState, useEffect, useRef } from "react";
import "./App.css";

/* ═══════════════════════════════════════════════════════════
   ELIGIBILITY ANALYZER
═══════════════════════════════════════════════════════════ */
function EligibilityAnalyzer() {
  const [form, setForm] = useState({
    platform: "", monthlyIncome: "", months: "", transactions: "", existingEmi: "",
  });
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const analyze = () => {
    const income = parseFloat(form.monthlyIncome) || 0;
    const months = parseFloat(form.months) || 0;
    const txn    = parseFloat(form.transactions) || 0;
    const emi    = parseFloat(form.existingEmi) || 0;

    const incomeS = Math.min(40, (income / 50000) * 40);
    const stabS   = Math.min(25, (months / 24) * 25);
    const txnS    = Math.min(20, (txn / 100) * 20);
    const emiRatio = income > 0 ? emi / income : 1;
    const emiS    = Math.max(0, 15 - emiRatio * 30);

    const score = Math.round(incomeS + stabS + txnS + emiS);
    const max   = income * 3;
    const level = score >= 60 ? "high" : score >= 35 ? "med" : "low";
    const label = level === "high" ? "High Eligibility" : level === "med" ? "Moderate Eligibility" : "Low Eligibility";
    const tip =
      level === "high"
        ? `Great profile! You qualify for up to ₹${max.toLocaleString()}. Apply for MUDRA or KreditBee.`
        : level === "med"
        ? "You may qualify for smaller loans. Increase income consistency and reduce EMIs."
        : "Build 6+ months of gig history and reduce existing debts to improve eligibility.";

    setResult({ score, label, level, tip, max });
  };

  const scoreColor =
    result?.level === "high" ? "#22d3ee" : result?.level === "med" ? "#fbbf24" : "#f87171";

  return (
    <div>
      <div className="sectionHeader">
        <h2>Eligibility Analyzer</h2>
        <p>Fill in your gig work details to get an instant AI-powered loan eligibility score.</p>
      </div>

      <div className="formRow">
        <div className="formGroup">
          <label>Gig Platform</label>
          <select value={form.platform} onChange={(e) => set("platform", e.target.value)}>
            <option value="">Select platform</option>
            <option>Swiggy</option>
            <option>Zomato</option>
            <option>Uber</option>
            <option>Ola</option>
            <option>Urban Company</option>
            <option>Other</option>
          </select>
        </div>
        <div className="formGroup">
          <label>Monthly Income (₹)</label>
          <input type="number" placeholder="e.g. 25000" value={form.monthlyIncome}
            onChange={(e) => set("monthlyIncome", e.target.value)} />
        </div>
        <div className="formGroup">
          <label>Months Active on Platform</label>
          <input type="number" placeholder="e.g. 12" value={form.months}
            onChange={(e) => set("months", e.target.value)} />
        </div>
        <div className="formGroup">
          <label>Monthly Digital Transactions</label>
          <input type="number" placeholder="e.g. 60" value={form.transactions}
            onChange={(e) => set("transactions", e.target.value)} />
        </div>
        <div className="formGroup">
          <label>Existing EMI (₹ / month)</label>
          <input type="number" placeholder="e.g. 2000" value={form.existingEmi}
            onChange={(e) => set("existingEmi", e.target.value)} />
        </div>
      </div>

      <button className="submitBtn" onClick={analyze}>
        Analyze Eligibility
      </button>

      {result && (
        <div className={`resultBox ${result.level === "high" ? "success" : result.level === "med" ? "warning" : "danger"}`}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div className="eligScore" style={{ color: scoreColor }}>
              {result.score}
              <span style={{ fontSize: "1.1rem", color: "inherit", opacity: 0.5 }}>/100</span>
            </div>
            <span className={`eligBadge badge-${result.level}`}>{result.label}</span>
          </div>
          <p>{result.tip}</p>
          {result.level !== "low" && (
            <p style={{ marginTop: "0.6rem", fontWeight: 700, color: "#22d3ee" }}>
              Estimated Max Loan: ₹{result.max.toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COLLATERAL ESTIMATOR
═══════════════════════════════════════════════════════════ */
function CollateralEstimator() {
  const [assets, setAssets] = useState([{ type: "", value: "" }]);
  const [result, setResult] = useState(null);

  const addAsset = () => setAssets((a) => [...a, { type: "", value: "" }]);
  const setField = (i, k, v) =>
    setAssets((a) => a.map((x, idx) => (idx === i ? { ...x, [k]: v } : x)));

  const estimate = () => {
    const discounts = { Vehicle: 0.6, "Gold/Jewellery": 0.75, Property: 0.5, Electronics: 0.4, Other: 0.35 };
    let total = 0;
    assets.forEach((a) => {
      const v = parseFloat(a.value) || 0;
      const d = discounts[a.type] || 0.35;
      total += v * d;
    });
    setResult(Math.round(total));
  };

  return (
    <div>
      {assets.map((a, i) => (
        <div className="formRow" key={i}>
          <div className="formGroup">
            <label>Asset Type</label>
            <select value={a.type} onChange={(e) => setField(i, "type", e.target.value)}>
              <option value="">Select</option>
              <option>Vehicle</option>
              <option>Gold/Jewellery</option>
              <option>Property</option>
              <option>Electronics</option>
              <option>Other</option>
            </select>
          </div>
          <div className="formGroup">
            <label>Estimated Value (₹)</label>
            <input type="number" placeholder="e.g. 50000" value={a.value}
              onChange={(e) => setField(i, "value", e.target.value)} />
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button className="submitBtn" style={{ flex: 1 }} onClick={addAsset}>
          + Add Asset
        </button>
        <button className="submitBtn" style={{ flex: 1 }} onClick={estimate}>
          Estimate Value
        </button>
      </div>

      {result !== null && (
        <div className="resultBox success" style={{ marginTop: "1.25rem" }}>
          <h4>Estimated Collateral Value</h4>
          <p className="collateralTotal">₹{result.toLocaleString()}</p>
          <p style={{ marginTop: "0.5rem" }}>
            This is the lendable value after standard lender discounts. Final valuation subject to lender assessment.
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXPENSE TRACKER
═══════════════════════════════════════════════════════════ */
function ExpenseTracker() {
  const [desc, setDesc]   = useState("");
  const [amount, setAmount] = useState("");
  const [cat, setCat]     = useState("Food");
  const [items, setItems] = useState([
    { desc: "Petrol", amount: 2500, cat: "Transport" },
    { desc: "Phone recharge", amount: 399, cat: "Utilities" },
  ]);

  const add = () => {
    if (!desc || !amount) return;
    setItems((prev) => [...prev, { desc, amount: parseFloat(amount), cat }]);
    setDesc("");
    setAmount("");
  };

  const remove = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i));
  const total = items.reduce((s, x) => s + x.amount, 0);
  const savingsEstimate = Math.max(0, Math.round(total * 0.2));

  return (
    <div>
      <div className="formRow">
        <div className="formGroup">
          <label>Description</label>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Fuel" />
        </div>
        <div className="formGroup">
          <label>Amount (₹)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 500" />
        </div>
        <div className="formGroup">
          <label>Category</label>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option>Food</option>
            <option>Transport</option>
            <option>Utilities</option>
            <option>EMI</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <button className="submitBtn" onClick={add}>
        Add Expense
      </button>

      <div className="expenseList">
        {items.map((item, i) => (
          <div className="expenseItem" key={i}>
            <div>
              <div>{item.desc}</div>
              <div className="cat">{item.cat}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className="amt">₹{item.amount.toLocaleString()}</span>
              <button className="delBtn" onClick={() => remove(i)}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <>
          <div className="totalRow">
            <span>Total Monthly Expenses</span>
            <span style={{ color: "#22d3ee" }}>₹{total.toLocaleString()}</span>
          </div>
          <div className="resultBox" style={{ marginTop: "1rem" }}>
            <h4>💡 Savings Tip</h4>
            <p>
              Reducing discretionary spend by 20% could free up{" "}
              <strong style={{ color: "#22d3ee" }}>₹{savingsEstimate.toLocaleString()}/month</strong>,
              improving your EMI repayment capacity and loan eligibility score.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DOCUMENT CHECKLIST
═══════════════════════════════════════════════════════════ */
function DocumentChecklist() {
  const docList = [
    "Aadhaar Card (Identity Proof)",
    "PAN Card",
    "Gig Platform Earnings Screenshot (last 3 months)",
    "Bank Statement (last 6 months)",
    "UPI Transaction History",
    "Selfie / Live Photo",
    "Mobile Number linked to Aadhaar",
    "Proof of Address (Utility Bill / Rent Agreement)",
  ];

  const [checked, setChecked] = useState([]);

  const toggle = (doc) =>
    setChecked((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );

  const pct = Math.round((checked.length / docList.length) * 100);
  const readyLabel = pct === 100 ? "🎉 All documents ready!" : pct >= 50 ? "Good progress — keep going!" : "Start checking off your documents below.";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.85rem", opacity: 0.65 }}>{readyLabel}</span>
        <span style={{ color: "#22d3ee", fontWeight: 800, fontSize: "1rem" }}>{pct}%</span>
      </div>

      <div className="progressBar">
        <div className="progressFill" style={{ width: `${pct}%` }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", opacity: 0.55, marginBottom: "1.25rem" }}>
        <span>{checked.length} of {docList.length} ready</span>
        {checked.length > 0 && (
          <span style={{ cursor: "pointer", color: "#22d3ee" }} onClick={() => setChecked([])}>
            Reset
          </span>
        )}
      </div>

      {docList.map((doc) => (
        <div
          key={doc}
          className={`checkItem ${checked.includes(doc) ? "done" : ""}`}
          onClick={() => toggle(doc)}
        >
          <div className="checkBox">
            {checked.includes(doc) && (
              <svg viewBox="0 0 14 14" width="11" height="11" style={{ display: "block", margin: "auto" }}>
                <polyline points="2,7 5.5,10.5 12,3" stroke="#022c33" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span>{doc}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FRAUD DETECTION
═══════════════════════════════════════════════════════════ */
function FraudDetection() {
  const [form, setForm] = useState({ income: "", txn: "", emi: "", accounts: "1", history: "" });
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const detect = () => {
    let risk = 0;
    const income   = parseFloat(form.income) || 0;
    const txn      = parseFloat(form.txn) || 0;
    const emi      = parseFloat(form.emi) || 0;
    const accounts = parseFloat(form.accounts) || 1;
    const history  = parseFloat(form.history) || 0;

    if (income > 0 && emi / income > 0.6) risk += 35;
    if (txn < 10)     risk += 20;
    if (accounts > 3) risk += 20;
    if (history < 3)  risk += 15;
    if (income > 150000) risk += 10;
    risk = Math.min(100, risk);

    const level = risk < 30 ? "low" : risk < 60 ? "medium" : "high";
    setResult({ risk, level });
  };

  const riskColor = result
    ? result.level === "low" ? "#22d3ee" : result.level === "medium" ? "#fbbf24" : "#f87171"
    : "#22d3ee";

  return (
    <div>
      <div className="formRow">
        <div className="formGroup">
          <label>Declared Monthly Income (₹)</label>
          <input type="number" value={form.income} onChange={(e) => set("income", e.target.value)} placeholder="e.g. 30000" />
        </div>
        <div className="formGroup">
          <label>Avg Monthly Transactions</label>
          <input type="number" value={form.txn} onChange={(e) => set("txn", e.target.value)} placeholder="e.g. 45" />
        </div>
        <div className="formGroup">
          <label>Total EMI Obligations (₹)</label>
          <input type="number" value={form.emi} onChange={(e) => set("emi", e.target.value)} placeholder="e.g. 5000" />
        </div>
        <div className="formGroup">
          <label>Number of Bank Accounts</label>
          <select value={form.accounts} onChange={(e) => set("accounts", e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div className="formGroup">
          <label>Months of Gig History</label>
          <input type="number" value={form.history} onChange={(e) => set("history", e.target.value)} placeholder="e.g. 8" />
        </div>
      </div>

      <button className="submitBtn" onClick={detect}>
        Run Fraud Check
      </button>

      {result && (
        <div className={`resultBox ${result.level === "low" ? "success" : result.level === "medium" ? "warning" : "danger"}`}
          style={{ marginTop: "1.25rem" }}>
          <div className="fraudMeter">
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", opacity: 0.7, marginBottom: "0.3rem" }}>
              <span>Risk Score</span>
              <span style={{ color: riskColor, fontWeight: 800 }}>{result.risk} / 100</span>
            </div>
            <div className="fraudBar">
              <div className="fraudFill" style={{ width: `${result.risk}%`, background: riskColor }} />
            </div>
          </div>
          <h4 style={{ color: riskColor }}>
            {result.level === "low" ? "✓ Low Risk Profile" : result.level === "medium" ? "⚠ Medium Risk Detected" : "✕ High Risk Detected"}
          </h4>
          <p style={{ marginTop: "0.4rem" }}>
            {result.level === "low"
              ? "Your financial profile appears consistent. Low fraud risk indicators detected."
              : result.level === "medium"
              ? "Some inconsistencies found. Lenders may request additional verification documents."
              : "High risk signals detected. Address EMI burden and bank activity before applying."}
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════ */
function Header({ theme, toggleTheme, setLanguage }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="glassHeader">
      <div className="logo">GigCredit AI</div>

      <nav>
        <button onClick={() => scrollTo("analyzer")}>Eligibility</button>
        <button onClick={() => scrollTo("loans")}>Loans</button>
        <button onClick={() => scrollTo("simulator")}>Simulator</button>
        <button onClick={() => scrollTo("tools")}>Tools</button>
      </nav>

      <div className="actions">
        <select className="languageSelect" onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">🌐 English</option>
          <option value="Hindi">हिंदी</option>
          <option value="Tamil">தமிழ்</option>
        </select>
        <button className="themeBtn" onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero">
      <div className="heroContent">
        {/* LEFT — text */}
        <div className="heroText">
          <h1>
            AI Micro-Loans for<br />
            India's <span>Gig Workers</span>
          </h1>
          <p>
            AI-powered micro-credit designed for Swiggy, Zomato, Uber and gig
            economy workers. Get fast eligibility insights, smarter loan matching
            and financial guidance — in seconds.
          </p>

          <div className="heroButtons">
            <button
              className="primaryBtn"
              onClick={() => document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })}
            >
              Check Eligibility
            </button>
            <button
              className="secondaryBtn"
              onClick={() => document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" })}
            >
              Open Simulator
            </button>
          </div>

          <div className="heroStats">
            <div className="stat">
              <h3>2.4L+</h3>
              <p>Workers Helped</p>
            </div>
            <div className="stat">
              <h3>₹850Cr</h3>
              <p>Loans Facilitated</p>
            </div>
            <div className="stat">
              <h3>92%</h3>
              <p>Approval Rate</p>
            </div>
          </div>
        </div>

        {/* RIGHT — glass visual */}
        <div className="heroRight">
          <div className="heroGlassCard">
            <h3>Live AI Credit Analysis</h3>

            <div className="heroStats" style={{ marginTop: 0, marginBottom: "1.5rem" }}>
              <div className="stat">
                <span className="statNumber">87</span>
                <span className="statLabel">Credit Score</span>
              </div>
              <div className="stat">
                <span className="statNumber">₹1.2L</span>
                <span className="statLabel">Max Eligible</span>
              </div>
              <div className="stat">
                <span className="statNumber">7.5%</span>
                <span className="statLabel">Best Rate</span>
              </div>
            </div>

            <div className="aiPulse" />
            <p className="aiText">
              AI is analysing your gig income patterns,<br />
              UPI history &amp; platform tenure in real-time.
            </p>
          </div>

          {/* Mini loan cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="loanCard">
              <h4>MUDRA Loan</h4>
              <p>₹50,000</p>
            </div>
            <div className="loanCard">
              <h4>KreditBee</h4>
              <p>₹1,00,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOAN MATCHER
═══════════════════════════════════════════════════════════ */
function LoanMatcher() {
  const loans = [
    {
      name: "MUDRA Micro Loan",
      tag: "Government Backed",
      max: 50000,
      rate: "7.5%",
      emi: 2100,
      tenure: "24 months",
      link: "https://www.mudra.org.in/",
    },
    {
      name: "KreditBee Instant",
      tag: "Fast Approval",
      max: 100000,
      rate: "12%",
      emi: 3200,
      tenure: "36 months",
      link: "https://www.kreditbee.in/",
    },
    {
      name: "MoneyTap Credit Line",
      tag: "Flexible Repayment",
      max: 200000,
      rate: "13%",
      emi: 4500,
      tenure: "48 months",
      link: "https://web.moneytap.com/",
    },
    {
      name: "Navi Personal Loan",
      tag: "No Collateral",
      max: 150000,
      rate: "9.9%",
      emi: 3800,
      tenure: "36 months",
      link: "https://navi.com/",
    },
  ];

  return (
    <section id="loans" className="section">
      <div className="sectionHeader">
        <h2>Loan Products Matcher</h2>
        <p>Curated loan products suited for gig workers. Compare rates, EMIs and apply directly.</p>
      </div>

      <div className="grid">
        {loans.map((loan, i) => (
          <div key={i} className="card">
            <div style={{
              display: "inline-block", fontSize: "11px", fontWeight: 700,
              background: "rgba(34,211,238,0.12)", color: "#22d3ee",
              padding: "3px 10px", borderRadius: "99px", marginBottom: "12px",
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}>
              {loan.tag}
            </div>
            <h3>{loan.name}</h3>
            <p>Max Loan: <strong style={{ color: "#22d3ee" }}>₹{loan.max.toLocaleString()}</strong></p>
            <p>Interest Rate: {loan.rate}</p>
            <p>Est. EMI: ₹{loan.emi}/month</p>
            <p>Tenure: {loan.tenure}</p>
            <button onClick={() => window.open(loan.link, "_blank")}>
              Apply Now →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIMULATOR
═══════════════════════════════════════════════════════════ */
function Simulator() {
  const [income,       setIncome]       = useState(30000);
  const [expenses,     setExpenses]     = useState(15000);
  const [emi,          setEmi]          = useState(2000);
  const [transactions, setTransactions] = useState(80);

  const incomeScore  = Math.min(100, (income / 50000) * 100);
  const expenseScore = Math.max(0, 100 - (expenses / income) * 100);
  const emiScore     = Math.max(0, 100 - (emi / income) * 100);
  const digitalScore = Math.min(100, transactions);

  const score = Math.round(
    incomeScore * 0.35 + expenseScore * 0.25 + emiScore * 0.2 + digitalScore * 0.2
  );

  const scoreColor =
    score >= 65 ? "#22d3ee" : score >= 40 ? "#fbbf24" : "#f87171";

  const label =
    score >= 65 ? "Strong Profile — High Approval Chance"
    : score >= 40 ? "Moderate Profile — Improve to Unlock Better Rates"
    : "Weak Profile — Focus on Building Income History";

  const maxLoan = Math.round(income * (score / 100) * 3);

  return (
    <section id="simulator" className="section">
      <div className="sectionHeader">
        <h2>Eligibility Simulator</h2>
        <p>Drag the sliders to see how your financial profile affects your reliability score in real-time.</p>
      </div>

      <div className="simulatorCard">
        {/* Score display */}
        <div className="score" style={{ color: scoreColor }}>
          {score}
        </div>
        <p className="scoreLabel">Predicted Reliability Score</p>

        {/* Score label */}
        <div style={{
          display: "inline-block", padding: "5px 18px", borderRadius: "99px",
          fontSize: "13px", fontWeight: 700, marginBottom: "2rem",
          background: scoreColor === "#22d3ee" ? "rgba(34,211,238,0.12)" : scoreColor === "#fbbf24" ? "rgba(251,191,36,0.12)" : "rgba(248,113,113,0.12)",
          color: scoreColor,
        }}>
          {label}
        </div>

        {/* Sliders — 2-column grid via CSS */}
        <div className="simSliders">
          <label>
            Monthly Income
            <span>₹{income.toLocaleString()}</span>
            <input type="range" min={5000} max={100000} step={1000} value={income}
              onChange={(e) => setIncome(+e.target.value)} />
          </label>
          <label>
            Monthly Expenses
            <span>₹{expenses.toLocaleString()}</span>
            <input type="range" min={1000} max={80000} step={500} value={expenses}
              onChange={(e) => setExpenses(+e.target.value)} />
          </label>
          <label>
            Existing EMI
            <span>₹{emi.toLocaleString()}</span>
            <input type="range" min={0} max={30000} step={500} value={emi}
              onChange={(e) => setEmi(+e.target.value)} />
          </label>
          <label>
            Monthly Transactions
            <span>{transactions}</span>
            <input type="range" min={0} max={200} step={5} value={transactions}
              onChange={(e) => setTransactions(+e.target.value)} />
          </label>
        </div>

        {/* Score breakdown */}
        <div className="scoreBreakdown">
          {[
            { label: "Income Score", val: Math.round(incomeScore), max: 100 },
            { label: "Expense Ratio", val: Math.round(expenseScore), max: 100 },
            { label: "EMI Burden",    val: Math.round(emiScore),    max: 100 },
            { label: "Digital Activity", val: Math.round(digitalScore), max: 100 },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "5px", opacity: 0.75 }}>
                <span>{item.label}</span>
                <span style={{ color: "#22d3ee", fontWeight: 700 }}>{item.val}</span>
              </div>
              <div className="fraudBar">
                <div className="fraudFill" style={{ width: `${item.val}%` }} />
              </div>
            </div>
          ))}

          {score > 0 && (
            <div className="resultBox success" style={{ marginTop: "1.25rem", textAlign: "left" }}>
              <h4>Estimated Max Loan</h4>
              <p style={{ color: "#22d3ee", fontWeight: 800, fontSize: "1.4rem", marginTop: "4px" }}>
                ₹{maxLoan.toLocaleString()}
              </p>
              <p style={{ marginTop: "4px" }}>Based on your current profile and income.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TOOLS
═══════════════════════════════════════════════════════════ */
const TOOL_META = {
  "Document Readiness Checklist": {
    icon: "📄",
    desc: "Check which documents you need and track your readiness.",
  },
  "Fraud Detection": {
    icon: "🛡",
    desc: "Analyse your profile for inconsistencies that may flag with lenders.",
  },
  "Expense Tracker": {
    icon: "📊",
    desc: "Log monthly expenses and get AI-powered savings tips.",
  },
  "Collateral Estimator": {
    icon: "🏷",
    desc: "Estimate the lendable value of your assets.",
  },
};

function Tools() {
  const [activeTool, setActiveTool] = useState("");
  const toolNames = Object.keys(TOOL_META);

  return (
    <section id="tools" className="section">
      <div className="sectionHeader">
        <h2>Smart Financial Tools</h2>
        <p>Everything you need to prepare, verify and optimise your loan application.</p>
      </div>

      <div className="toolsGrid">
        {toolNames.map((tool) => (
          <div
            key={tool}
            className="toolCard"
            onClick={() => setActiveTool(activeTool === tool ? "" : tool)}
            style={{ borderColor: activeTool === tool ? "rgba(34,211,238,0.5)" : undefined }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>
              {TOOL_META[tool].icon}
            </div>
            <h3>{tool}</h3>
            <p>{TOOL_META[tool].desc}</p>
            <div style={{
              marginTop: "18px", fontSize: "13px", fontWeight: 700,
              color: "#22d3ee", display: "flex", alignItems: "center", gap: "6px",
            }}>
              {activeTool === tool ? "✕ Close" : "Open Tool →"}
            </div>
          </div>
        ))}
      </div>

      {activeTool && (
        <div className="toolOutput">
          <h2>
            {TOOL_META[activeTool].icon} {activeTool}
          </h2>
          {activeTool === "Document Readiness Checklist" && <DocumentChecklist />}
          {activeTool === "Fraud Detection"              && <FraudDetection />}
          {activeTool === "Expense Tracker"              && <ExpenseTracker />}
          {activeTool === "Collateral Estimator"         && <CollateralEstimator />}
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   AI ASSISTANT (floating chat)
═══════════════════════════════════════════════════════════ */
function Assistant() {
  const [open, setOpen]   = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef        = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm your GigCredit AI assistant. Ask me about eligibility, EMI, documents or interest rates.",
    },
  ]);

  const tips = [
    "Maintain stable income for at least 6 months to improve your eligibility score.",
    "Keep your EMI-to-income ratio below 40% for better loan approval chances.",
    "Active UPI transaction history helps lenders verify your income digitally.",
    "MUDRA loans offer the lowest rates at 7.5% — ideal for first-time gig borrowers.",
    "Linking Aadhaar to your bank account speeds up KYC verification significantly.",
    "Saving ₹5,000+ per month signals financial discipline and improves your profile.",
    "Reduce existing EMIs before applying — lenders prefer a debt-to-income ratio under 50%.",
    "Platform tenure matters: 12+ months on Swiggy or Zomato unlocks better loan tiers.",
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    const reply = tips[Math.floor(Math.random() * tips.length)];
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: reply },
    ]);
    setInput("");
  };

  const handleKey = (e) => { if (e.key === "Enter") sendMessage(); };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div id="assistant">
      <div className="chatToggle" onClick={() => setOpen(!open)} title="AI Loan Assistant">
        {open ? "✕" : "💬"}
      </div>

      {open && (
        <div className="chatWindow">
          <div className="chatHeader">🤖 GigCredit AI Assistant</div>

          <div className="chatMessages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "userMsg" : "aiMsg"}>
                {msg.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="chatControls">
            <input
              type="text"
              placeholder="Ask about loans, EMI, documents…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      width: "100%",
      padding: "40px 6vw",
      borderTop: "1px solid rgba(34,211,238,0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
      fontSize: "13px",
      opacity: 0.6,
    }}>
      <span style={{ fontWeight: 700, opacity: 1 }}>
        <span style={{ background: "linear-gradient(90deg,#22d3ee,#0ea5a4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          GigCredit AI
        </span>
      </span>
      <span>AI-powered micro-credit for India's gig economy</span>
      <span>© {new Date().getFullYear()} GigCredit AI. All rights reserved.</span>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [theme,    setTheme]    = useState("dark");
  const [language, setLanguage] = useState("en");

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} setLanguage={setLanguage} />

      <Hero />

      <section id="analyzer" className="section">
        <EligibilityAnalyzer />
      </section>

      <LoanMatcher />
      <Simulator />
      <Tools />
      <Footer />

      {/* Chat is fixed-position, rendered outside flow */}
      <Assistant />
    </div>
  );
}
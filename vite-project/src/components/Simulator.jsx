import React, { useState } from "react";

function Simulator() {

  const [income, setIncome] = useState(30000);
  const [expenses, setExpenses] = useState(15000);
  const [emi, setEmi] = useState(2000);
  const [transactions, setTransactions] = useState(80);

  /* ---------- SCORE MODEL ---------- */

  const incomeScore = Math.min(100, (income / 50000) * 100);

  const expenseRatio = expenses / income;
  const expenseScore = Math.max(0, 100 - expenseRatio * 100);

  const emiRatio = emi / income;
  const emiScore = Math.max(0, 100 - emiRatio * 100);

  const digitalScore = Math.min(100, transactions);

  const reliabilityScore = Math.round(
    incomeScore * 0.35 +
    expenseScore * 0.25 +
    emiScore * 0.20 +
    digitalScore * 0.20
  );

  return (
    <section id="simulator" className="section">

      <h2>Loan Eligibility Simulator</h2>

      <div className="card simulatorCard">

        <div className="score">{reliabilityScore}</div>
        <p className="scoreLabel">Predicted Reliability Score</p>

        {/* INPUT SLIDERS */}

        <div className="sliderGroup">

          <label>Monthly Income: ₹{income}</label>
          <input
            type="range"
            min="10000"
            max="100000"
            value={income}
            onChange={(e)=>setIncome(Number(e.target.value))}
          />

          <label>Monthly Expenses: ₹{expenses}</label>
          <input
            type="range"
            min="5000"
            max="60000"
            value={expenses}
            onChange={(e)=>setExpenses(Number(e.target.value))}
          />

          <label>Existing EMI: ₹{emi}</label>
          <input
            type="range"
            min="0"
            max="20000"
            value={emi}
            onChange={(e)=>setEmi(Number(e.target.value))}
          />

          <label>Monthly Digital Transactions: {transactions}</label>
          <input
            type="range"
            min="0"
            max="150"
            value={transactions}
            onChange={(e)=>setTransactions(Number(e.target.value))}
          />

        </div>

        {/* BREAKDOWN */}

        <div className="scoreBreakdown">

          <h4>Score Factors</h4>

          <ul>
            <li>Income Stability (35%) → {Math.round(incomeScore)}</li>
            <li>Expense Ratio (25%) → {Math.round(expenseScore)}</li>
            <li>EMI Load (20%) → {Math.round(emiScore)}</li>
            <li>Digital Activity (20%) → {Math.round(digitalScore)}</li>
          </ul>

        </div>

      </div>

    </section>
  );
}

export default Simulator;
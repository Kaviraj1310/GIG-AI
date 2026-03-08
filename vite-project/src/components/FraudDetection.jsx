import React, { useState } from "react";

export default function FraudDetection() {

  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [transactions, setTransactions] = useState("");
  const [result, setResult] = useState(null);

  const checkFraud = async () => {

    const res = await fetch("http://localhost:5000/api/fraud/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        income: Number(income),
        expenses: Number(expenses),
        transactions: Number(transactions)
      })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="card fraudCard">

      <h3>Fraud Detection</h3>

      <input
        type="number"
        placeholder="Monthly Income ₹"
        value={income}
        onChange={(e)=>setIncome(e.target.value)}
      />

      <input
        type="number"
        placeholder="Monthly Expenses ₹"
        value={expenses}
        onChange={(e)=>setExpenses(e.target.value)}
      />

      <input
        type="number"
        placeholder="Monthly Transactions"
        value={transactions}
        onChange={(e)=>setTransactions(e.target.value)}
      />

      <button onClick={checkFraud}>
        Analyze Fraud Risk
      </button>

      {result && (
        <div className="fraudResult">

          <h4>Status: {result.status}</h4>
          <p>Risk Score: {result.riskScore}</p>

          {result.warnings.length > 0 && (
            <ul>
              {result.warnings.map((w,i)=>(
                <li key={i}>{w}</li>
              ))}
            </ul>
          )}

        </div>
      )}

    </div>
  );
}
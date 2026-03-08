import React from "react";
import ExpenseTracker from "./ExpenseTracker";
import { useState } from "react";

function ToolsGrid() {
  const [openExpense, setOpenExpense] = useState(false);
  const tools = [
    "Document Readiness Checklist",
    "Fraud Detection",
    "Expense Tracker",
    "Collateral Estimator"
  ];

  return (
    <section id="tools" className="section">

      <h2>Smart Financial Tools</h2>

      <div className="grid">

        {tools.map((tool, i) => (
          <div key={i} className="card">

            <h3>{tool}</h3>

            <button
               onClick={() => setOpenExpense(true)}
            >
              Open Tool
            </button>

          </div>
        ))}

      </div>
      
      {openExpense && <ExpenseTracker onClose={() => setOpenExpense(false)} />}
        
    </section>
  );
}

export default ToolsGrid;
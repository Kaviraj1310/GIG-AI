import React from "react";
import ExpenseTracker from "./ExpenseTracker";
import { useState } from "react";

export default function ToolsGrid() {

  return (

    <div>

      <div className="sectionHeader">

        <h2>Smart Financial Tools</h2>

        <p>
          AI-powered financial tools designed for gig workers to
          improve credit eligibility and financial stability.
        </p>

      </div>


      <div className="toolsGrid">

        <div className="toolCard">
          <h3>Document Readiness</h3>
          <p>Check if all required loan documents are ready.</p>
        </div>

        <div className="toolCard">
          <h3>Fraud Detection</h3>
          <p>AI scans financial activity to detect fraud risk.</p>
        </div>

        <div className="toolCard">
          <h3>Expense Tracker</h3>
          <p>Monitor spending to improve loan eligibility.</p>
        </div>

        <div className="toolCard">
          <h3>Collateral Estimator</h3>
          <p>Estimate value of assets for secured loans.</p>
        </div>

      </div>

    </div>

  );
}
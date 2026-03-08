/* ---------------- LOAN ELIGIBILITY ENGINE ---------------- */

/*
This file contains logic for calculating loan eligibility
based on gig worker financial data.
*/


/* -------- Calculate Loan Eligibility Score -------- */

export function calculateLoanScore({ income, expenses, emi }) {

  const disposableIncome = income - expenses - emi;

  const incomeStabilityWeight = 0.35;
  const expenseRatioWeight = 0.25;
  const repaymentCapacityWeight = 0.40;

  const expenseRatio = expenses / income;
  const repaymentCapacity = disposableIncome / income;

  const incomeScore = income > 20000 ? 80 : 60;

  const expenseScore =
    expenseRatio < 0.4 ? 90 :
    expenseRatio < 0.6 ? 70 :
    50;

  const repaymentScore =
    repaymentCapacity > 0.4 ? 90 :
    repaymentCapacity > 0.2 ? 70 :
    50;

  const finalScore =
    incomeScore * incomeStabilityWeight +
    expenseScore * expenseRatioWeight +
    repaymentScore * repaymentCapacityWeight;

  return Math.round(finalScore);
}


/* -------- Reliability Level -------- */

export function getReliabilityLevel(score) {

  if (score >= 80) return "High";
  if (score >= 60) return "Medium";
  return "Low";

}


/* -------- Loan Eligibility Status -------- */

export function getEligibilityStatus(score) {

  if (score >= 75) return "Eligible";
  if (score >= 60) return "Partially Eligible";
  return "Not Eligible";

}


/* -------- Loan Product Matching -------- */

export function getEligibleLoans(score) {

  const loans = [
    {
      name: "MUDRA Micro Loan",
      maxAmount: 50000,
      interestRate: "7.5%",
      provider: "Government of India"
    },
    {
      name: "KreditBee Instant Loan",
      maxAmount: 100000,
      interestRate: "12%",
      provider: "KreditBee"
    },
    {
      name: "MoneyTap Credit Line",
      maxAmount: 200000,
      interestRate: "13%",
      provider: "MoneyTap"
    }
  ];

  if (score >= 80) return loans;

  if (score >= 60) return loans.slice(0, 2);

  return [];
}


/* -------- Improvement Suggestions -------- */

export function getImprovementTips({ income, expenses, emi }) {

  const tips = [];

  const expenseRatio = expenses / income;

  if (expenseRatio > 0.6) {
    tips.push("Try reducing non-essential monthly expenses.");
  }

  if (emi > income * 0.3) {
    tips.push("Your EMI obligations are high. Consider paying off small loans first.");
  }

  if (income < 20000) {
    tips.push("Increasing gig income consistency can improve your eligibility.");
  }

  if (tips.length === 0) {
    tips.push("Your financial profile looks healthy.");
  }

  return tips;
}
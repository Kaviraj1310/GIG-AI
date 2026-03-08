export const checkFraud = async (req, res) => {

  const { income, expenses, transactions } = req.body;

  if (!income || !expenses || !transactions) {
    return res.status(400).json({
      message: "Missing input values"
    });
  }

  let riskScore = 0;
  let warnings = [];

  if (expenses > income) {
    riskScore += 30;
    warnings.push("Expenses higher than income.");
  }

  if (income > 150000 && transactions < 10) {
    riskScore += 25;
    warnings.push("Income very high but transaction activity low.");
  }

  if (transactions > 200 && income < 20000) {
    riskScore += 20;
    warnings.push("Transaction count unusually high.");
  }

  let status = "SAFE";

  if (riskScore > 40) status = "HIGH RISK";
  else if (riskScore > 20) status = "MEDIUM RISK";

  res.json({
    status,
    riskScore,
    warnings
  });
};
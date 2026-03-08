export const checkFraud = async (req, res) => {

  try {

    const { income, expenses, transactions } = req.body;

    let riskScore = 0;
    let warnings = [];

    /* RULE 1: Income vs expenses mismatch */

    if (expenses > income * 1.2) {
      riskScore += 30;
      warnings.push("Expenses exceed reported income.");
    }

    /* RULE 2: Unrealistic high income */

    if (income > 200000 && transactions < 10) {
      riskScore += 25;
      warnings.push("High income but very few transactions.");
    }

    /* RULE 3: Too many transactions but low income */

    if (transactions > 200 && income < 20000) {
      riskScore += 25;
      warnings.push("Unusual transaction activity for reported income.");
    }

    /* RULE 4: Suspicious financial pattern */

    if (income > 100000 && expenses < 2000) {
      riskScore += 20;
      warnings.push("Income extremely high but expenses extremely low.");
    }

    let status = "SAFE";

    if (riskScore > 40) status = "HIGH RISK";
    else if (riskScore > 20) status = "MEDIUM RISK";

    res.json({
      status,
      riskScore,
      warnings
    });

  } catch (error) {

    res.status(500).json({
      error: "Fraud analysis failed"
    });

  }

};
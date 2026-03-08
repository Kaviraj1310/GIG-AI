exports.getLoanOptions = (req, res) => {

  const { score } = req.body;

  let loans = [];

  if (score >= 80) {

    loans = [
      { name: "MUDRA Loan", amount: 50000, interest: "7.5%" },
      { name: "KreditBee", amount: 100000, interest: "12%" },
      { name: "MoneyTap", amount: 200000, interest: "13%" }
    ];

  }

  if (score < 80) {

    loans = [
      { name: "KreditBee Starter", amount: 25000, interest: "15%" }
    ];

  }

  res.json({ loans });

};
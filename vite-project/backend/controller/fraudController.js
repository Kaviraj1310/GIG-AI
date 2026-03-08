exports.detectFraud = (req, res) => {

  const { transactions } = req.body;

  const suspicious = transactions.filter(
    (t) => t.amount > 100000
  );

  res.json({
    suspiciousTransactions: suspicious
  });

};
let expenses = [];

exports.addExpense = (req, res) => {

  const { title, amount, category, date } = req.body;

  const newExpense = {
    id: Date.now(),
    title,
    amount,
    category,
    date
  };

  expenses.push(newExpense);

  res.json({
    message: "Expense added",
    expense: newExpense
  });

};

exports.getExpenses = (req, res) => {

  res.json(expenses);

};

exports.getExpenseSummary = (req, res) => {

  let total = expenses.reduce((sum, e) => sum + e.amount, 0);

  let categories = {};

  expenses.forEach(e => {
    if (!categories[e.category]) categories[e.category] = 0;
    categories[e.category] += e.amount;
  });

  res.json({
    totalExpense: total,
    categoryBreakdown: categories
  });

};
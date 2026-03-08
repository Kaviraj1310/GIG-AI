export const addExpense = async (expense) => {

  const res = await fetch("http://localhost:5000/api/expense/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(expense)
  });

  return res.json();

};

export const getExpenses = async () => {

  const res = await fetch("http://localhost:5000/api/expense/all");

  return res.json();

};

export const getSummary = async () => {

  const res = await fetch("http://localhost:5000/api/expense/summary");

  return res.json();

};
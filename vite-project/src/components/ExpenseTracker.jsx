import React, { useState } from "react";

export default function ExpenseTracker() {

  const defaultCategories = ["Fuel", "Food", "Travel", "Maintenance"];

  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("Fuel");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {

    const finalCategory =
      category === "Other" ? customCategory : category;

    if (!amount || !finalCategory) return;

    const newExpense = {
      id: Date.now(),
      category: finalCategory,
      amount: Number(amount)
    };

    setExpenses([...expenses, newExpense]);

    setAmount("");
    setCustomCategory("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const total = expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  return (
    <div className="card" style={{ marginTop: "30px" }}>

      <h2>Expense Tracker</h2>

      {/* CATEGORY SELECT */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: "10px", marginTop: "10px", width: "100%" }}
      >
        {defaultCategories.map((c) => (
          <option key={c}>{c}</option>
        ))}
        <option>Other</option>
      </select>

      {/* CUSTOM CATEGORY */}
      {category === "Other" && (
        <input
          type="text"
          placeholder="Enter new category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          style={{ padding: "10px", marginTop: "10px", width: "100%" }}
        />
      )}

      {/* AMOUNT INPUT */}
      <input
        type="number"
        placeholder="Expense amount ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "10px", marginTop: "10px", width: "100%" }}
      />

      {/* ADD BUTTON */}
      <button
        onClick={addExpense}
        style={{
          marginTop: "10px",
          padding: "10px",
          width: "100%",
          cursor: "pointer"
        }}
      >
        Add Expense
      </button>

      {/* TOTAL */}
      <h3 style={{ marginTop: "20px" }}>
        Total Expenses: ₹{total}
      </h3>

      {/* EXPENSE LIST */}

      <div style={{ marginTop: "20px" }}>

        {expenses.length === 0 && (
          <p>No expenses added yet.</p>
        )}

        {expenses.map((exp) => (
          <div
            key={exp.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginTop: "8px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)"
            }}
          >

            <span>
              {exp.category} — ₹{exp.amount}
            </span>

            <button
              onClick={() => deleteExpense(exp.id)}
              style={{
                background: "#ff4d4f",
                border: "none",
                color: "white",
                padding: "5px 10px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}
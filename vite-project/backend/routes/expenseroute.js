const express = require("express");

const router = express.Router();

const {
  addExpense,
  getExpenses,
  getExpenseSummary
} = require("../controllers/expensecontroller");

router.post("/add", addExpense);

router.get("/all", getExpenses);

router.get("/summary", getExpenseSummary);

module.exports = router;
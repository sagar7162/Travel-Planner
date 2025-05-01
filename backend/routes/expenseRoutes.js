const express = require("express");
const router = express.Router();
const {
  addExpense,
  editExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expenseController");

// Create a new expense for a trip
router.post("/trip/:id/expense", addExpense);

// Get all expenses for a trip
router.get("/trip/:id/expenses", getExpenses);

// Update an expense
router.put("/expense/:expenseId", editExpense);

// Delete an expense
router.delete("/expense/:expenseId", deleteExpense);

module.exports = router;
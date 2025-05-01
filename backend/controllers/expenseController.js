const Trip = require("../models/Trip");
const Expense = require("../models/Expenses");
const { decode } = require("../middlewares/authMiddleware");

// Add a new expense
const addExpense = async (req, res) => {
  try {
    const userObj = decode(req.cookies.authToken);
    const userId = userObj._id;
    const tripId = req.params.id;

    const { totalAmount, description, splitAmong } = req.body;

    // Create a new expense
    const expense = new Expense({
      trip: tripId,
      paidBy: userId,
      totalAmount,
      description,
      splitAmong,
    });

    // Save the expense
    await expense.save();

    // Add the expense reference to the trip
    await Trip.findByIdAndUpdate(tripId, {
      $push: { expense: expense._id },
    });

    res.status(201).json({ success: true, expense });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update an existing expense
const editExpense = async (req, res) => {
  try {
    const userObj = decode(req.cookies.authToken);
    const userId = userObj._id;
    const expenseId = req.params.expenseId;

    // Find expense and verify the user has permission to edit it
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    if (expense.paidBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to edit this expense",
        });
    }

    const { totalAmount, description, splitAmong } = req.body;

    // Update the expense
    expense.totalAmount = totalAmount || expense.totalAmount;
    expense.description = description || expense.description;
    expense.splitAmong = splitAmong || expense.splitAmong;

    await expense.save();

    res.status(200).json({ success: true, expense });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all expenses for a trip
const getExpenses = async (req, res) => {
  try {
    const tripId = req.params.id;

    // Find all expenses for this trip and populate user information
    const expenses = await Expense.find({ trip: tripId })
      .populate("paidBy", "name email")
      .populate("splitAmong.user", "name email");

    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  try {
    const userObj = await decode(req.cookies.authToken);
    const userId = userObj._id;
    const expenseId = req.params.expenseId;

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    if (expense.paidBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to delete this expense",
        });
    }

    // Remove expense reference from trip
    await Trip.findByIdAndUpdate(expense.trip, {
      $pull: { expense: expenseId },
    });

    // Delete the expense
    await Expense.findByIdAndDelete(expenseId);

    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { addExpense, editExpense, getExpenses, deleteExpense };
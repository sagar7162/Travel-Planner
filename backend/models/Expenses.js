const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalAmount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  splitAmong: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      amount: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Expense", expenseSchema);


//paidBy  -- jo pay karta hai 
//totalAmount -- total amount of the expense
//splitAmong -- array of users and their respective amounts jo unko pay karna hai

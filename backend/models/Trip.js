const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  expense : [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  subDestinations: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Automatically generate unique _id
      name: {type :String, required: true},
      description: {type :String, required: false},
    },
  ],
  messages: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Trip", tripSchema);



//have to add expenses to the trip model, and also add a new model for expenses
// expenses should have a user, amount
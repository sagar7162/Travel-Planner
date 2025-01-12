const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  subDestinations: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Automatically generate unique _id
      name: String,
      description: String,
      expenditures: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          amount: Number,
        },
      ],
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

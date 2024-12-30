const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }]  // Reference to trips the user is part of
});

module.exports = mongoose.model('User', userSchema);

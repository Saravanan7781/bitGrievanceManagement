const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
name: { type: String, required: true },
email: {
    type: String,
    required: [true, "Email cant be empty"]
    },
password: {
      type: String,
      required: [true, "Password cant be empty"],
  },
phone: { type: String }, // For caretakers
rollno: { type: String }, // For students
  room: { type: String }, // For students
  hostel: { type: String}, // For all users
  caretakerName: { type: String }, // For students
  role: { type: String, enum: ['student', 'caretaker', 'admin'], required: true } // Define roles

});

module.exports = mongoose.model("login", loginSchema);
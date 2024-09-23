const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email cant be empty"]
    },
    password: {
        type: String,
        required: [true, "Password cant be empty"],
    }
});

module.exports = mongoose.model("login", loginSchema);
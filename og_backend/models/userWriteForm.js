const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'logins',
        index:true,
        required: [true, "user id not got from token"]
    },
    domain: {
        type: String,
        required: [true, "domain not provided"]
    },
    desc: {
        type: String,
        required: [true, "description not provided"]
    },
    proof: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'rejected','resolved'],
        default:"pending"
    }

})

module.exports = mongoose.model("userWriteForm", Schema);
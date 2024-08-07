const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    userId:{
        type: Number,
        
    },
    userName:{
        type: String
    },
    mailId:{
        type: String
    },
    password:{
        type: String
    },
    role: {
        type:String
    }
});

// const sessionSchema = new mongoose.Schema({
//     sessionId:{
//         type: String
//     },
//     sess
// })

const loginModel = mongoose.model('login',loginSchema);


module.exports = loginModel;
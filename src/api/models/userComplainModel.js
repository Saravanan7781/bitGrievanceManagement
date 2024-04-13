const mongoose = require('mongoose');


const complainSchema = new mongoose.Schema({
      complainID:{
        type: Number
      },
      userID:{
        type: Number
      },
      discription:{
        type: String
      },
      status:{
        type: String
      },
      time:{
        type: Time
      },
      date:{
        type: Date
      }
})
// still development needed in the file
// if error found then comment all the line in ths file

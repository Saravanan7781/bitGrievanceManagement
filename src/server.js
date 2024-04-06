//imports
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./api/routes/userAuth");
const cors = require("cors");



const DB_URI = "mongodb://127.0.0.1:27017/bitGrievance";



const server = express();


//server config
server.use(express.json());
server.use(cors()); 
//connect to database
const DBconnect = async() =>{
    try{
        console.log("Connecting To Local Database")
        mongoose.connect(DB_URI);
        console.log("Local Database Connected Successfully")
    }

    catch (err) {
        console.log("Local Database Connection Failed...")
        console.log(err)
    }
}

// routes
server.use("/api/auth/",authRouter)




server.listen(8090,()=>{
    console.log("Server Started At Port: 8090");
    DBconnect();
})
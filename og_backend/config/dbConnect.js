const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const dbConnect = asyncHandler(async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log(`Database connected successfully: ${connect.connection.name}`);
    } catch (err) {
        console.log("Can't connect to database:" + err);
    }
});

module.exports = dbConnect;

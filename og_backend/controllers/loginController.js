const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const loginDB = require('../models/loginSchema')
const jwt =  require('jsonwebtoken')

const loginController = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401);
            throw new Error("All fields are mandatory!")
        }
        else {
            const data = await loginDB.findOne({ email });
            if (!data) {
                 res.status(404);
                  throw new Error("User data not found")
                
            }
            else {
                if (password !== data.password) {
                    res.status(404);
                    throw new Error("Email or password is incorrect");
                }
                else {
                    let token = jwt.sign({
                        user: await loginDB.findOne({ email }).select('-password -image ')
                    }, process.env.TOP_SECRET_KEY, {
                        expiresIn: '30m'
                    });
                    
                    console.log(token)

    
                    res.json({
                        token
                    })
                }
            }
        }
            }

)


module.exports = loginController;
// imports
const express = require("express");
const router = express.Router()
const userAuth = require('../controllers/userAuthController')


//routes
router.post("/login",userAuth);


//exports
module.exports = router;
const express = require("express");
const router = express.Router();
// const User = require('../models/userSchema');
const userController = require('../controllers/userProfileController');

router.post('/users', userController.createUser);

router.get('/users' , userController.getAllUsers);

router.get('/users/:id', userController.getUserById);

router.put('/users/:id', userController.updateUser);

module.exports = router;
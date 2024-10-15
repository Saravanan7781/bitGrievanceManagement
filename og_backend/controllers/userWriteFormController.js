const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const userWriteFormModel = require('../models/userWriteForm');

const saveUserWriteForm = async(req, res) => {
    
    try {
        const response = new userWriteFormModel(req.body);
        await response.save();
        res.json(response);
    }

    catch (err) {
        res.status(500);
        console.log(err.message);
        throw new Error('Error while submitting user write form');
    }
}

module.exports = {saveUserWriteForm}
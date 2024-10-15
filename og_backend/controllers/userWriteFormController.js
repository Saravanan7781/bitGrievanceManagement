const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const userWriteFormModel = require('../models/userWriteForm');

const saveUserWriteForm = asyncHandler(async (req, res) => {
    const { desc, domain, user_id, proof } = req.body;
    
    try {
        // Create and save the document directly
        const response = await userWriteFormModel.create({
            desc,
            domain,
            user_id,
            proof
        });
        
        res.status(201).json(response); // Return response with 201 status code for created
    } catch (err) {
        console.error('Error while submitting user write form:', err.message);
        res.status(500).json({ message: 'Error while submitting user write form' });
    }
});

module.exports = { saveUserWriteForm };

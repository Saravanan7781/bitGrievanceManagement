const express = require('express');
const userWriteForm = require('../models/userWriteForm');

const flaggedComplaints = async (req, res) => {
    const role = req.query.role;
    if (role === "admin") {
        const submission = await userWriteForm.aggregate([{
            $lookup: {
                from: "logins",
                as: "submissions",
                localField: "user_id",
                foreignField:"_id"
            }
        }, {
            $unwind:"$submissions"
            }, {
            $match: {
            "status": "Flagged"
        }
        }
        ])
        res.json(submission);
    }
    else if (role === 'caretaker') {
        
        const { hostel } = req.body;

        const submission = await userWriteForm.aggregate([{
            $lookup: {
                from: "logins",
                as: "submissions",
                localField: "user_id",
                foreignField:"_id"
            }
        }, {
            $unwind:"$submissions"
            }, {
            $match: {
                    "submissions.hostel":hostel
                }
            },
            {
            $match: {
            "status": "Flagged"
        }
        }
        ])
        res.json(submission);
    }

}


module.exports = flaggedComplaints;
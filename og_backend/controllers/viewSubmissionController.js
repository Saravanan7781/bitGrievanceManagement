const userWriteForm = require("../models/userWriteForm");
const mongoose = require('mongoose');
const viewSubmissionController = async (req, res) => {
    try {
        const id = req.params.id;

        const submission = await userWriteForm.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id) 
                }
            },
            {
                $lookup: {
                    from: "logins",               
                    localField: "user_id",
                    foreignField: "_id",
                    as: "submissions"
                }
            },
            {
                $unwind: "$submissions"            
            }
        ]);
        //  console.log(submission)
        res.json(submission);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching submission" });
        console.log(err.message);
    }
};

module.exports = viewSubmissionController;

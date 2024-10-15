const userWriteForm = require('../models/userWriteForm');


const showSubmissions = async(req,res) => {
    try {
        const submission = await userWriteForm.aggregate([{
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
       
        res.json(submission);
    
    } catch (err) {
        console.log("error while showing the submissions" + err)
        res.status(500);
    }
}

module.exports = {showSubmissions}
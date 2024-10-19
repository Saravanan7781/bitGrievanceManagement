const userWriteForm = require('../models/userWriteForm');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const showSubmissions = async (req, res) => {
    let { search } = req.query; 
    let userId;
    if (ObjectId.isValid(search))
    {
        userId = new ObjectId(search)
    }
    console.log(search)
    const { role, hostel } = req.body;
    if (role === "admin") {
        try {   
            if (search === 'null') {
                console.log("hi")
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
            }
            else {
                if (search === 'Pending') {
                    search = 'pending'
                    console.log(search)
                }
                // console.log("prefffered?")
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
                     }, {
                    $match: {
                        "status":search
                    }
                }
                      
                
                
                ]);
       
                res.json(submission);
            }
    
        } catch (err) {
            console.log("error while showing the submissions///" + err)
            res.status(500);
        }
    }
    else if (role === 'caretaker') {
        try {
            if (search === "null") {
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
                },
                {
                    $match: {
                        "submissions.hostel": hostel
                    }
                }
                ]);
       
                res.json(submission);
            }
            else {
                // console.log("caretaker preffered :" + search)
                if (search === 'Pending') {
                    search = 'pending'
                    console.log(search)
                }
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
                     },
                     {
                    $match: {
                        "submissions.hostel": hostel
                    }
                },
                     {
                    $match: {
                        "status":search
                    }
                }
                ]);
       
                res.json(submission);
            }
    
        } catch (err) {
            console.log("error while showing the submissions" + err)
            res.status(500);
        }
    }
    else if (role === 'student') {
        try {
            // console.log("hi student")
            const submissions = await userWriteForm.aggregate([{
                $lookup: {
                    from: "logins",
                    localField: "user_id",
                    foreignField: "_id",
                    as:"submissions"
                }
            },
                {
                $unwind:"$submissions"
                }
                , {
                    $match: {
                        user_id:  userId
                    }
                }
            ])
            // console.log(submissions)
            res.json(submissions)
        }

        catch (err) {
            res.json({
                "error": "Error while showing the submissions for students"
            })
        }
    }
}


module.exports = {showSubmissions}
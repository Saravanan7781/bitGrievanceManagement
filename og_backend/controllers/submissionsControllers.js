const userWriteForm = require('../models/userWriteForm');


const showSubmissions = async (req, res) => {
    const {search} = req.query;
    const { role, hostel } = req.body;
    console.log(search)
    if (role === "admin") {
        try {   
            if (search === 'null') {
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
                console.log("prefffered?")
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
}


module.exports = {showSubmissions}
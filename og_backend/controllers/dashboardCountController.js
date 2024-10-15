const submissionModel = require('../models/userWriteForm');
let total, pending;

const dashboardCountController = async(req, res) => {
    const { role, hostel } = req.body;
    // console.log(req.body);
    if (role === 'admin') {
        try {
            total = await submissionModel.countDocuments();
            pending = await submissionModel.
            countDocuments({ status:"pending" });
        
            resolved = await submissionModel.countDocuments({ status:"Resolved" });
        

            res.json({
                total,
                pending,
                resolved
            })
        }
        catch (err) {
            console.log(err + 'in getting total documents');
        }
    }

    else if (role === 'caretaker') {
        console.log("caretaker unlocked");
        //finding the total no of submissions as per the hostel
        const total = await submissionModel.aggregate(
            [{
                $lookup: {
                    from: "logins",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "result"
                }
            },
                {
                    $unwind:"$result"
                
                },
                {
                    $match: {
                        "result.hostel": hostel
                    }
                },
                {
                $count: "count"
               }
        ]
        )

        //finding the resolved complaints from the documents

        const resolved = await submissionModel.aggregate([
            {
                $lookup: {
                    from: "logins",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "result"
                }
            },
            {
                $unwind:'$result'
            },
            {
                $match: {
                    "result.hostel": hostel
                }
            },
            {
                $match: {
                    "status": "Resolved"
                }
            },
            {
                $count: "resolvedCount"
            }
        ]);

        const totalRes = (total[0] && total[0].count) ? total[0].count : 0;
        console.log(totalRes)
        const resolvedRes = (resolved[0])?(resolved[0].resolvedCount) : 0;
        const pending = totalRes - resolvedRes;

        res.json({
            hostel,
            total: totalRes,
            resolved: resolvedRes,
            pending: pending
        })
    }
    // console.log(role)
    return;
}


module.exports = dashboardCountController;
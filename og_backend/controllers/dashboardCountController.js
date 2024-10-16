const submissionModel = require('../models/userWriteForm');
let total, pending,rejected;

const dashboardCountController = async(req, res) => {
    const { role, hostel } = req.body;
    if (role === 'admin') {
        try {
            total = await submissionModel.countDocuments();
            pending = await submissionModel.
            countDocuments({ status:"pending" });
        
            resolved = await submissionModel.countDocuments({ status:"Resolved" });
            
            rejected = await submissionModel.countDocuments({status:"Rejected"})
            


            res.json({
                total,
                pending,
                resolved,
                rejected
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

        const rejected = await submissionModel.aggregate([
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
                    "status": "Rejected"
                }
            },
            {
                $count: "rejectedCount"
            }
        ]);

        const totalRes = (total[0].count)
        const resolvedRes = (resolved[0])?(resolved[0].resolvedCount) : 0;
        const rejectedRes = rejected[0] ? (rejected[0].rejectedCount) : 0;
        const pending = totalRes - (resolvedRes+rejectedRes);

        res.json({
            hostel,
            total: totalRes,
            resolved: resolvedRes,
            pending: pending,
            rejected: rejectedRes
        })
    }
    // console.log(role)
    return;
}


module.exports = dashboardCountController;
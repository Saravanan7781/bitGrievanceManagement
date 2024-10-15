const userWriteForm = require('../models/userWriteForm');

const submissionApproval = async (req, res) => {
    try {
        const id = req.params.id;
        const { status} = req.query;
        const updateUserWriteForm =await userWriteForm.findByIdAndUpdate(id, 
            { status: status },
           { new:true}
        );
        res.json({updateUserWriteForm});
    }
    catch (err) {
        res.status(500).json({ message: err.stack });
    }
}


module.exports = submissionApproval;
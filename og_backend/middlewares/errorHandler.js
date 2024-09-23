const {constants} = require('../utils/constants')

const errorHandler = (err, req, res, next) => {
    console.log("error handler");
    const statusCode = res.statusCode !== 200 ? res.statusCode : constants.INTERNAL_SERVER_ERR;
    console.log(constants.VALIDATION_ERR);
    switch (statusCode) {
        case constants.VALIDATION_ERR:
            res.json({
                title: "VALIDATION_ERR Error",
                msg: err.message,
                stack: err.stack
            })
            break;
        
            case constants.UNAUTHORIZED_ERR:
            res.json({
                title: "UNAUTHORIZED_ERR Error",
                msg: err.message,
                stack:err.stack
            })
               break;
        
            case constants.FORBIDDEN_ERR:
            res.json({
                title: "FORBIDDEN_ERR Error",
                msg: err.message,
                stack:err.stack
            })
               break;
        
            case constants.NOT_FOUND_ERR:
            res.json({
                title: "NOT_FOUND Error",
                msg: err.message,
                stack:err.stack
            })
               break;
        

        default:
            res.json({
                title: " Internal Server Error",
                msg: err.message,
                stack:err.stack
            })
               break;
        

    }
}

module.exports = { errorHandler };
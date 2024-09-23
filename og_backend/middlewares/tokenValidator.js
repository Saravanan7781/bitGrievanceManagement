const jwt = require('jsonwebtoken');

const tokenValidator = (req, res, next) => {
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        let token = authHeader.split(" ")[1];
        if (token) { 
            jwt.verify(token,process.env.TOP_SECRET_KEY, (err, dec) => {
                if(err) {
                    console.log("Fake User!!!");
                    return res.status(401).json({ message: "Token is invalid or expired" });

                }
                else{
                    req.user = dec.user;
                    next();
                }
            })
        }
        else {
            res.status(401).json("Session timed out!!!")
        }
    }
    else{
        res.status(401).json("Unauthorized User");
    }


}

module.exports = tokenValidator;
//imports
const { response } = require('express');
const loginModel = require('../models/userAuthModel')
const {v1:uuidv1} = require('uuid');

function createSessionId() {
    const generatedId = uuidv1();
    
    return generatedId
}



const userAuth = async (req,res) =>{
    try{
        const { username, password } = req.body;
        console.log(username+" "+ password)
        const dbResult = await loginModel.findOne({userName:username})
        if (dbResult == null){
            return res.send({
                msg: "Username or Password is incorrect",
                code: 0
            })
        }
        else if (dbResult['password'] == password){
            const id = await createSessionId()
            return res.send({
                msg: "Successfully logined in",
                code: 1,
                sessionId: id
            })
        }
        else {
            return res.send({
                msg: "Username or Password is incorrect",
                code: 0
            })
        }
    }
    catch (err){
        console.log("Some Thing Went Wrong...")
        console.log(err)
    }

}
module.exports = userAuth;
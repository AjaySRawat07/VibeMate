const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");


const userAuth = async(req,res,next) =>{
    try{
        const {token} = req.cookies;
        
        if(!token){
            throw new Error("Token is not validate");
        }

        const decodeToken = await jwt.verify(token,process.env.JWT_SECRITE_TOKEN);

        const {_id} = decodeToken;

        const user = await UserModel.findById(_id);
        if(!user){
            throw new Error("User not found");
        }   

        req.user = user;

        next();

    }
    catch(err){
        console.error("Error in user-Auth: ",err.message);
    }
}

module.exports = {
    userAuth
}
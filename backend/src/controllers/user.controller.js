const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { validateSignData } = require("../utils/validator");
const bcrypt = require('bcrypt');


const register = async(req,res) =>{
    try{
        validateSignData(req);
        const {firstName,lastName,email,phoneNumber,password,gender} = req.body;


        const existingUser = await UserModel.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message : "User already register"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        await UserModel.create({
            firstName,lastName,email,phoneNumber,password : hashPassword,gender
        })
        res.status(201).json({
            success : true,
            message : "User register successfully"
        })
    }
    catch(err){
        console.error("Error will registration..",err.message);
        res.json({
            success : false,
            message : "User not registered"
        })
    }
}

const login = async(req,res) =>{
    try{
        const {email , password} = req.body;

        const user = await UserModel.findOne({email : email});

        if(!user){
            return res.json({
                success : false,
                message : "Invalid credentials"
            })
        }
        const isPasswordValid = await user.validatePassword(password);
        
        if(!isPasswordValid){
            return res.json({
                success : false,
                message : "Invalid credentials"
            })
        }

        const token = await user.getJWT();
        // console.log(token);
        
        res.cookie("token",token, {httpOnly : true});
        res.status(201).json({
            success : true,
            message :    "User login successfull"
        })
    }
    catch(err){
        console.error("Error will login : ", err.message);
    }
}


const profile = async(req,res) =>{
    try{
        const {token} = req.cookies;
        const decodeToken = await jwt.verify(token, process.env.JWT_SECRITE_TOKEN);
        // const _id = decodeToken;
        // console.log(_id);

        const user = await req.user; // get user from auth middleware

        res.status(201).json({
            success : true,
            message : "Profile excess successfully",
            result : user,
        })
    }
    catch(err){
        console.error("Error in user profile: ",err.message);
    }
}

const findUser = async(req,res) =>{
    const userEmail = req.body.email;
    try{
         if(!userEmail){
            res.json({
                success : false,
                message : "User Id not found",
            })
         }
         else{
            const user = await UserModel.find({});
            res.json({
                success : true,
                message : "User found succesfully",
                result : user
            })
         } 
    }
    catch(err){
        console.error("Error in find user ",err.message);
    }
}

const deleteUser = async(req,res) =>{
    try{
        const userId = req.body.userId;
        const user = await UserModel.findByIdAndDelete({ _id : userId});

        res.status(201).json({
            success : true,
            message : "User deleted successfully",
            result : user
        })
    }
    catch(err){
        console.error("Error in user deletion",err.message);
    }
}

const updateUser = async(req,res) =>{
    try{
        const userId = req.params?.userId;

        const userData = req.body;

        const ALLOWED_UPDATES = ["photoURL","age","firstName","lastName","password","skills","about","gender"];

        const isAllowedToUpdate = Object.keys(userData ).every((k) => ALLOWED_UPDATES.includes(k));

        if(!isAllowedToUpdate){
            res.json({
                success : false,
                message : "Update not allowed !!"
            })
            throw new Error("Update not allowed for Some Fields");
        }

        if(userData?.skills.length > 5){
            throw new Error("Skills should be 5 only");
        }

        const user = await UserModel.findByIdAndUpdate({_id : userId},userData,{
            returnDocument : 'after'
        })
        console.log(user);
        res.json({
            success : true,
            message : "User updated successfully",
            result : user
        });
    }
    catch(err){
        console.error("Error in user deletion",err.message);
    }
}

module.exports = {
    register,
    login,
    findUser,
    deleteUser,
    updateUser,
    profile,
}
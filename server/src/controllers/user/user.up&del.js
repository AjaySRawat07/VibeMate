const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");
const { validateSignData } = require("../../utils/validator");
const bcrypt = require('bcrypt');


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

const forgetPassword = async(req,res) =>{
    try{
        const {confirmEmail, newPassword, confirmPassword} = req.body;

        const loggedInUser = req.user; 
        
        if(loggedInUser.email !== confirmEmail){
            return res.json({
                success : false,
                message : "Email is not valid: "
            })
        }
        if(!newPassword || !confirmPassword){
            res.json({
                message : "Password field cannot be empty"
            })
        }

        if(newPassword !== confirmPassword){
            res.json({
                message : "Password don't match"
            })
        }
        await loggedInUser.save();

        const hashedPassword = await bcrypt.hash(newPassword,10);
        loggedInUser.password = hashedPassword;

        const updateUser = await UserModel.findById(loggedInUser._id);
        console.log("Saved hashed password in DB : ",updateUser.password);

        res.json({
            message : "Password change successfully"
        })
    }
    catch(err){
        console.error("Error in forget password: ",err.message);
    }
}

module.exports = {
    deleteUser,
    updateUser,
    forgetPassword
}
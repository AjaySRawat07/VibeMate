const validator = require("validator");


const 
validateSignData = (req) =>{
    const {firstName,lastName,email,phoneNumber,password,gender} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name field is required");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email field is required");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Required a strong password");
    }
    else if(!validator.isMobilePhone(phoneNumber)){
        throw new Error("Phone number is required");
    }
    else if(!gender){
        throw new Error("Gender to batade :) ");
    }
}

module.exports = {
    validateSignData
};
const connectionModel = require("../../models/connectionRequest.model");
const UserModel = require("../../models/user.model");

const requestSection = async(req,res) =>{
    try{
        console.log(req.user)
        const fromUserId = req.user;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];

        if(!allowedStatus.includes(status)){
            return res.json({ message : "status not allowed!"});
        }

        const connectionRequest = new connectionModel({
            fromUserId,
            toUserId,
            status
        });

        const toUser = await UserModel.findById(toUserId);
        if(!toUser){
            return res.json({
                message : "User not found!"
            })
        }

        const existingConnectionRequest = await connectionModel.findOne({
            $or : [
                { fromUserId , toUserId},
                {fromUserId : toUserId , toUserId : fromUserId}
            ]
        });

        if(existingConnectionRequest){
            return res.json({
                success : false,
                message : "Request already Exists!!"
            })
        }

        const data = await connectionRequest.save();

        res.status(201).json(({
            message : req.user.firstName + " " + status + " " + toUser.firstName,
            result : data,
        }))
    }
    catch(err){
        console.error("Error in requestSection: ", err.message);
    }
}

module.exports = requestSection;
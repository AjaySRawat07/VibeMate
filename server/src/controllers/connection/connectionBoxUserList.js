const connectionModel = require("../../models/connectionRequest.model");

const connectionBoxList = async(req,res)  =>{
    try{
        const loggedInUser = req.user;
        // console.log(loggedInUser);
        const {status,requestId} = req.params;
        // console.log(requestId);

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(401).json({
                message : "Status not allowed"
            })
        }

        const connectionRequest = await connectionModel.findOne({
            fromUserId : requestId,
            toUserId : loggedInUser._id,
            status : "interested",
        })

        if(!connectionRequest){
            return res.status(401).json({
                message : "connection request not found"
            })
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.status(201).json({
            message : "Connected successfully",
            result : data
        })
    }
    catch(err){
        console.log("Error in connectionBoxList: ", err.message);
    }
}

module.exports = connectionBoxList;
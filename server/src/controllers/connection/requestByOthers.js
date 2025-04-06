const connectionModel = require("../../models/connectionRequest.model");

const USER_SAFE_EXE = "firstName lastName photoURL about skills ";

const reqRecivedOfOthers = async(req,res) =>{
    try{
        const loggedInUser = req.user;
        console.log(loggedInUser);
        const connectionRequests = await connectionModel.find({
            toUserId  : loggedInUser._id,
            status : "interested",
        }).populate("fromUserId", USER_SAFE_EXE)
        // }).populate("fromUserId", ["firstName", "lastName"]) another method
        res.json({
            success : true,
            message : "Data fetched successfully",
            result : connectionRequests
        })
    }
    catch(error){
        console.error("Error in request recived pannel: ",error.message);
    }
}

const userFriendsSection = async(req,res) =>{
    try{
        const loggedInUser = req.user;

        const ConnectionRequest = await connectionModel.find({
            $or : [
                { toUserId : loggedInUser._id, status: "accepted"},
                {fromUserId : loggedInUser._id, status : "accepted"},
            ]
        })
        .populate("fromUserId", USER_SAFE_EXE)
        .populate("toUserId" , USER_SAFE_EXE);

        const data = ConnectionRequest.map(row => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({
            success : "true",
            message : "User connections fetched successfully",
            data : data,
        })
    }
    catch(error){
        console.error("Error in Fried connections: ",error.message);
    }
}

module.exports = {
    reqRecivedOfOthers,
    userFriendsSection
};
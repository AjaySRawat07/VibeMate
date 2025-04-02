const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        fromUserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required : true,
        },
        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required : true,
        },
        status : {
            type : String,
            required : true,
            enum : {
                values : ["ignore","interested","accepted","rejected"],
                message : `{VALUE} is incorrect status type`,
            }
        },
    },{
        timestamps : true,
})

// for better searched result from db
connectionSchema.index({ fromUserId : 1, toUserId : 1});

connectionSchema.pre("save", function(next){
    const connectionRequest = this;
    // check if same user can send request for same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourSelf");
    }
    next();
})

const connectionModel = mongoose.model("connectionRequest",connectionSchema);

module.exports = connectionModel;
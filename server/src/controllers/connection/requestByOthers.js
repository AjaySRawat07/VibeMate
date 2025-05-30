const connectionModel = require("../../models/connectionRequest.model");
const UserModel = require("../../models/user.model");

const USER_SAFE_EXE = "firstName lastName photoURL about skills ";

const reqRecivedOfOthers = async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log(loggedInUser);
    const connectionRequests = await connectionModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_EXE);
    // }).populate("fromUserId", ["firstName", "lastName"]) another method
    res.json({
      success: true,
      message: "Data fetched successfully",
      result: connectionRequests,
    });
  } catch (error) {
    console.error("Error in request recived pannel: ", error.message);
  }
};

const userFriendsSection = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const ConnectionRequest = await connectionModel
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_EXE)
      .populate("toUserId", USER_SAFE_EXE);

    const data = ConnectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      success: "true",
      message: "User connections fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error in Fried connections: ", error.message);
  }
};

const userFeedContainer = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit; // formula for skip

    const connectionRequests = await connectionModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    // not adding those user in feed whom you already with any type of connection
    const hideUserFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const user = await UserModel.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } }, // $nin => not in this array
        { _id: { $ne: loggedInUser._id } }, // $ne => not a loggin user
      ],
    })
      .select(USER_SAFE_EXE)
      .skip(skip)
      .limit(limit);

    res.send(user);
  } catch (error) {
    console.error("Error in userFeedContainer : ", error.message);
  }
};

module.exports = {
  reqRecivedOfOthers,
  userFriendsSection,
  userFeedContainer,
};

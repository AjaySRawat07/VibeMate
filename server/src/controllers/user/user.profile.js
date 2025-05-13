const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");
const { validateEditProfileData } = require("../../utils/validator");

const profile = async (req, res) => {
  try {
    const { token } = req.cookies;
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRITE_TOKEN);
    // const _id = decodeToken;
    // console.log(_id);

    const user = await req.user; // get user from auth middleware

    res.status(201).json({
      success: true,
      message: "Profile excess successfully",
      result: user,
    });
  } catch (err) {
    console.error("Error in user profile: ", err.message);
  }
};

const profileEdit = async (req, res) => {
  try {
    if (false && !validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser.set(key, req.body[key]);
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} profile updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    console.error("Error in profile editing: ", error.message);
  }
};

const findUser = async (req, res) => {
  const userEmail = req.body.email;
  try {
    if (!userEmail) {
      res.json({
        success: false,
        message: "User Id not found",
      });
    } else {
      const user = await UserModel.find({});
      res.json({
        success: true,
        message: "User found succesfully",
        result: user,
      });
    }
  } catch (err) {
    console.error("Error in find user ", err.message);
  }
};

module.exports = {
  profile,
  profileEdit,
  findUser,
};

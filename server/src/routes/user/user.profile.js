const express = require("express");
const { userAuth } = require("../../middlewares/auth");
const {
  profile,
  findUser,
  updateUser,
  profileEdit,
  forgetPassword,
} = require("../../controllers/user/user.controller");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, profile);
profileRouter.get("/data", userAuth, findUser);
profileRouter.post("/profile/edit", userAuth, profileEdit);
profileRouter.post("/password/forget", userAuth, forgetPassword);

// for update random person with it user id
profileRouter.patch("/update/:userId", userAuth, updateUser);

module.exports = profileRouter;

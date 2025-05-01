const express = require("express");
const authRouter = express.Router();
const {
  register,
  login,
  logout,
} = require("../../controllers/user/user.controller");

const { userAuth } = require("../../middlewares/auth");

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

module.exports = authRouter;

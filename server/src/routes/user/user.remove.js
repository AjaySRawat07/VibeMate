const express = require("express");
const { userAuth } = require("../../middlewares/auth");
const { deleteUser } = require("../../controllers/user/user.controller");
const rmRouter = express.Router();

rmRouter.delete("/delete",userAuth,deleteUser);


module.exports = rmRouter;
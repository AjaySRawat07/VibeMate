const express = require("express");
const { userAuth } = require("../../middlewares/auth");
const{ reqRecivedOfOthers, userFriendsSection }= require("../../controllers/connection/requestByOthers");

const usersRouter  = express.Router();

usersRouter.get("/user/requests/received", userAuth , reqRecivedOfOthers);

usersRouter.post("/user/connections", userAuth , userFriendsSection);

module.exports = usersRouter;
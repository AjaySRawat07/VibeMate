const express = require("express");
const { userAuth } = require("../../middlewares/auth");
const {
  reqRecivedOfOthers,
  userFriendsSection,
  userFeedContainer,
} = require("../../controllers/connection/requestByOthers");

const usersRouter = express.Router();

usersRouter.get("/user/requests/received", userAuth, reqRecivedOfOthers);

usersRouter.post("/user/connections", userAuth, userFriendsSection);

usersRouter.get("/user/feed", userAuth, userFeedContainer);

module.exports = usersRouter;

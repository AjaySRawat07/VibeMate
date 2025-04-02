const express = require("express");
const requestSection = require("../../controllers/connection/requestSection");
const { userAuth } = require("../../middlewares/auth");
const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId", userAuth, requestSection);

module.exports = requestRouter;
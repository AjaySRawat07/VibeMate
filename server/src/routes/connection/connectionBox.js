const express = require("express");
const { userAuth } = require("../../middlewares/auth");
const connectionBoxList = require("../../controllers/connection/connectionBoxUserList");

const connectionBox = express.Router();

connectionBox.post("/request/send/:status/:requestId",userAuth, connectionBoxList);

module.exports = connectionBox;
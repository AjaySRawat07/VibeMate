const express = require("express");
const {register, findUser, deleteUser, updateUser, login, profile} = require("../controllers/user.controller");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/register",register);

router.post("/login",login);

router.get("/profile",userAuth,profile);
router.get("/data", userAuth,findUser);
router.delete("/delete",userAuth,deleteUser);
router.patch("/update/:userId",userAuth,updateUser);

module.exports = router;
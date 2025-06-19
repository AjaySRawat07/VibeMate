const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");
const { validateSignData } = require("../../utils/validator");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    validateSignData(req);
    const { firstName, lastName, email, phoneNumber, password, gender } =
      req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already register",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashPassword,
      gender,
    });

    const token = await user.getJWT();
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      success: true,
      message: "User register successfully",
      data: user,
    });
  } catch (err) {
    console.error("Error will registration..", err.message);
    res.json({
      success: false,
      message: "User not registered",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send("all fields are required");
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = await user.getJWT();
    // console.log(token);

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: "User login successfull",
      data: user,
    });
  } catch (err) {
    console.error("Error will login : ", err.message);
  }
};

const logout = async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    res.json({
      success: false,
      message: "Token not valid",
    });
  }
  res
    .cookie("token", null, {
      expiresIn: new Date(Date.now()),
    })
    .status(201)
    .json({
      message: "Logout successfully",
    });
};

module.exports = {
  register,
  login,
  logout,
};

const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: 4,
      maxLength: 40,
      required: [true, "First name must be required"],
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email : ", value);
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 12,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Invalid mobile number : ", value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 80,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not a strong password : ", value);
        }
      },
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["male", "female", "other"],
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoURL: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`Invalid photo URL: ${value}`);
        }
      },
    },
    about: {
      type: String,
      default: "Active Tinder user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRITE_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;

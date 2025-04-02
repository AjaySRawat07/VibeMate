const { register, login, logout } = require("./user.auth");
const { findUser, profile, profileEdit } = require("./user.profile");
const { deleteUser, updateUser, forgetPassword } = require("./user.up&del");


module.exports = {
    register,
    login,
    logout,
    findUser,
    deleteUser,
    updateUser,
    profile,
    profileEdit,
    forgetPassword
}
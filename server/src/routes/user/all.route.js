const authRouter = require("./user.auth");
const profileRouter = require("./user.profile");
const rmRouter = require("./user.remove");

const allRouter = {
    authRouter,
    profileRouter,
    rmRouter
}

module.exports = allRouter;
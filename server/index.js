require("dotenv").config();
const express = require("express");
const {
  authRouter,
  profileRouter,
  rmRouter,
} = require("./src/routes/user/all.route");
const requestRouter = require("./src/routes/connection/sendConnection");
const connectToDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const connectionBox = require("./src/routes/connection/connectionBox");
const usersRouter = require("./src/routes/connection/friend.reqs");
var cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

// global middleware
app.use(express.json());
app.use(cookieParser());

// user related API
app.use("/api/t1/app", authRouter);
app.use("/api/t2/user", profileRouter);
app.use("/api/t3/del", rmRouter);

// connection API
app.use("/api/v1", requestRouter);
app.use("/api/v2", connectionBox);
app.use("/api/v3", usersRouter);

// mongoose connection
connectToDB()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("Error DB connection : ", err));

const PORT = process.env.PORT_NO || 5001;

app.listen(PORT, () => {
  console.log(`Server started at portNo. ${PORT}`);
});

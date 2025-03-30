require("dotenv").config();
const express = require("express");
const userRouter = require("./src/routes/user.route");
const connectToDB = require("./src/config/db");
const cookieParser = require('cookie-parser')

const app = express();

// global middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/t1/user",userRouter);

connectToDB()
.then(() => console.log("DB connected successfully"))
.catch((err) => console.log("Error DB connection : ", err));

const PORT = process.env.PORT_NO||5001;

app.listen(PORT, () => {
    console.log(`Server started at portNo. ${PORT}`);
  });
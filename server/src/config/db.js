const mongoose = require("mongoose");

const connectToDB = async() =>{
 await mongoose.connect(process.env.DB_URL)
}

module.exports = connectToDB;
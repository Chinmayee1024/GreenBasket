const mongoose = require("mongoose");
const connectDB = async (req, res, next) => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connectDB;

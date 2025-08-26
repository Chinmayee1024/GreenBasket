const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
const connectCloudinary = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to connect to cloudinary.",
      error: error.message,
    });
  }
};

module.exports = connectCloudinary;

const jwt = require("jsonwebtoken");

// login Seller : /api/seller/login
const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (email and password) are required.",
      });
    }

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        message: "Seller logged in successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to login seller.",
      error: error.message,
    });
  }
};
// check seller isAuth : /api/seller/is-auth
const isSellerAuth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "seller authenticated succesfully",
    });
  } catch (error) {
    console.log("❌ [isSellerAuth] Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to authenticate user.",
      error: error.message,
    });
  }
};
//Logout Seller : /api/seller/logout
const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0,
    });
    return res.status(200).json({
      success: true,
      message: "Seller logged out successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to logout seller.",
      error: error.message,
    });
  }
};
module.exports = { sellerLogin, isSellerAuth, sellerLogout };

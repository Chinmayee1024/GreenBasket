//Register User

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, and password) are required.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // set cookie with token
    res.cookie("token", token, {
      httpOnly: true, // prevent js to access cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days    cookie expiration time
    }); // set cookie with token
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user, //user:{email:user.email,name:user.name}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register user.",
      error: error.message,
    });
  }
};
//  Login User : /api/user/login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (email and password) are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password.",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to login user.",
      error: error.message,
    });
  }
};


// check Auth : /api/user/is-auth
const checkAuth = async (req, res) => {
  try {
    console.log("🔥 [checkAuth] Entered checkAuth function");
    console.log("👉 req.user:", req.user);

    // use userId from middleware (req.user)
    const userId = req.user?.id || req.body?.userId;
    console.log("👉 Extracted userId:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not provided.",
      });
    }

    const user = await User.findById(userId).select("-password");
    console.log("👉 DB User found:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    console.log("❌ [checkAuth] Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to authenticate user.",
      error: error.message,
    });
  }
};

//Logout User : /api/user/logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0,
    });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to logout user.",
      error: error.message,
    });
  }
};
module.exports = { registerUser, login, checkAuth, logout };

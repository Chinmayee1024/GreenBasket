const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    console.log("🔥 [authUser] Entered middleware");

    // log cookies
    console.log("👉 Incoming cookies:", req.cookies);

    const token = req.cookies.token;
    console.log("👉 Extracted token:", token);

    if (!token) {
      console.log("❌ No token found in cookies");
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    // verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("👉 Decoded token data:", decodedData);

    if (decodedData.id) {
      req.user = { id: decodedData.id }; // ✅ better than using req.body
      console.log("✅ User ID set in req.user:", req.user);
    } else {
      console.log("❌ Decoded token does not contain an id");
      return res.status(401).json({
        success: false,
        message: "Not Authorized - Invalid token",
      });
    }

    next();
  } catch (error) {
    console.log("❌ [authUser] Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to authenticate user.",
      error: error.message,
    });
  }
};

module.exports = authUser;

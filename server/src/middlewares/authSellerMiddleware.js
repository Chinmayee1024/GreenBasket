const jwt = require("jsonwebtoken");

const authSeller = async (req, res, next) => {
  try {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decodedData = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (decodedData.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    console.log("❌ [authSeller] Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to authenticate seller.",
      error: error.message,
    });
  }
};

module.exports = authSeller;

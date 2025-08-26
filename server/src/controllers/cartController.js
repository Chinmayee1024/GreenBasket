const User = require("../models/user");

//Update user CartData :/api/cart/update
const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.cartItems = cartItems;
    await user.save();
    res.json({
      success: true,
      message: "Cart data updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update cart data.",
      error: error.message,
    });
  }
};
module.exports = { updateCart };

//Add address : /api/address/add

const Address = require("../models/address");

const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id;
    await Address.create({
      ...address,
      userId,
    });
    res.json({
      success: true,
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add address.",
      error: error.message,
    });
  }
};

//Get user Address : /api/address/get
const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await Address.find({ userId });
    res.json({
      success: true,
      message: "Address fetched successfully",
      addresses,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch address.",
      error: error.message,
    });
  }
};

//Update user Address : /api/address/update
const updateAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    const updatedAddress = await Address.findOneAndUpdate(
      { userId },
      { ...address },
      { new: true }
    );
    res.json({
      success: true,
      message: "Address updated successfully",
      updatedAddress,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update address.",
      error: error.message,
    });
  }
};

//Delete user Address : /api/address/delete
const deleteAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const deletedAddress = await Address.findOneAndDelete({ userId });
    res.json({
      success: true,
      message: "Address deleted successfully",
      deletedAddress,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete address.",
      error: error.message,
    });
  }
};

module.exports = { addAddress, getAddress, updateAddress, deleteAddress };

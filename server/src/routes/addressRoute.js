const express = require("express");
const router = express.Router();
const {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");
const authUser = require("../middlewares/authUserMiddleware");

router.post("/address/add", authUser, addAddress);
router.get("/address/get", authUser, getAddress);
router.post("/address/update", authUser, updateAddress);
router.post("/address/delete", authUser, deleteAddress);
module.exports = router;

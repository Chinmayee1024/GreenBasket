const express = require("express");
const router = express.Router();
const {
  sellerLogin,
  isSellerAuth,
  sellerLogout,
} = require("../controllers/sellerController");
const authSeller = require("../middlewares/authSellerMiddleware");

router.post("/seller/login", sellerLogin);
router.get("/seller/is-auth", authSeller, isSellerAuth);
router.post("/seller/logout", authSeller, sellerLogout);
module.exports = router;

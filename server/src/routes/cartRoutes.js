const express = require("express");
const router = express.Router();
const { updateCart } = require("../controllers/cartController");
const authUser = require("../middlewares/authUserMiddleware");

router.post("/cart/update", authUser, updateCart);
module.exports = router;

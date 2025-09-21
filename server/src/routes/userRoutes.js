const express = require("express");
const {
  registerUser,
  login,
  checkAuth,
  logout,
} = require("../controllers/userController");
const authUser = require("../middlewares/authUserMiddleware");
const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", login);
router.get("/user/is-auth", authUser, checkAuth);
router.get("/user/logout", authUser, logout);

module.exports = router;

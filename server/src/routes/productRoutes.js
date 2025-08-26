const express = require("express");
const router = express.Router();
const {
  addProduct,
  productList,
  productById,
  changeStock,
} = require("../controllers/productController");
const upload = require("../configs/multer");
const authSeller = require("../middlewares/authSellerMiddleware");

router.post("/product/add", upload.array(["images"]), authSeller, addProduct);
router.get("/product/list", productList);
router.get("/product/id", productById);
router.post("/product/stock", authSeller, changeStock);
module.exports = router;

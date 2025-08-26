const Product = require("../models/product");

const cloudinary = require("cloudinary").v2;
// Add Product : /api/product/add
const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    console.log(productData);
    const images = req.files;
    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    await Product.create({
      ...productData,
      image: imagesUrl,
    });
    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add product.",
      error: error.message,
    });
  }
};

// Get Product : /api/product/list
const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products.",
        error: error.message,
      });
    }
  }
};

// Get single Product : /api/product/id
const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product.",
      error: error.message,
    });
  }
};

// Get Product inStock : /api/product/stock
const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      { id },
      { inStock },
      { new: true }
    );

    await product.save();
    res.json({
      success: true,
      message: "Product stock updated successfully",
      product,
    });
  } catch (error) {}
};
module.exports = { addProduct, productList, productById, changeStock };

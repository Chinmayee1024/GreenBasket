const Product = require("../models/product");

const cloudinary = require("cloudinary").v2;
// Add Product : /api/product/add
const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    console.log(productData);
    const images = req.files;
    console.log(images);
    if (!images || images.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }
    let imagesUrl = await Promise.all(
      images.map((image) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          stream.end(image.buffer); // ✅ send buffer instead of path
        });
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
      id,
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

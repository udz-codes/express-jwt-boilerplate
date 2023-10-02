const router = require("express").Router();
const Product = require("../../models/ProductModel");
const authenticateUser = require("../verifyToken");

router.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit || 200;
    const page = parseInt(req.query.page) || 1;

    const skip = (page - 1) * limit;

    const returnProducts = await Product.find().limit(limit).skip(skip);
    res.status(200).json({ page: page, limit: limit, returnProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred ", err: err });
  }
});

router.post("/products", authenticateUser, async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const newProduct = new Product({ ...req.body });

    const addProduct = await newProduct.save();
    res.status(201).json({
      message: "Product Added Successfully",
      addedProduct: addProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred ", err: err });
  }
});

router.put("/products", authenticateUser, async (req, res) => {
  try {
    const productId = req.query.productId;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred ", err: err });
  }
});

router.delete("/products", authenticateUser, async (req, res) => {
  try {
    const productId = req.query.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred ", err: err });
  }
});

module.exports = router;

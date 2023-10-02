const router = require("express").Router();
const Product = require("../../models/ProductModel");
const authenticateUser = require("../verifyToken");

router.get("/get-products", async (req, res) => {
  try {
    const limit = req.query.limit || 200;
    const skip = req.query.skip || 0;

    const returnProducts = await Product.find().limit(limit).skip(skip);
    res.status(200).json({ returnProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred ", err: err });
  }
});

router.post("/create-product", authenticateUser, async (req, res) => {
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

router.put("/update-product", authenticateUser, async (req, res) => {
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

router.delete("/delete-product", authenticateUser, async (req, res) => {
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

const router = require("express").Router();
const Product = require("../models/ProductModel");

router.get("/", (req, res) => {
  res.send("Home page");
});

router.get("/products", async (req, res) => {
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

module.exports = router;

const asyncHandler = require("express-async-handler");
const Shop = require("../models/shopModal");
const Product = require("../models/productModal");
const { green } = require("colors");

const addProduct = asyncHandler(async (req, res) => {
  const { productTitle, categoryName, description, stock, shopId, pic, price } =
    req.body;

  if (
    !productTitle ||
    !categoryName ||
    !description ||
    !stock ||
    !shopId ||
    !pic ||
    !price
  ) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  const productExist = await Product.findOne({ productTitle });

  if (productExist) {
    console.log("Product already exist!!!".red.bold);
    res.status(400).json({
      error: "Product already exist !!!",
    });
    throw new error("Product already exist!!!");
  }

  const product = await Product.create({
    productTitle,
    categoryName,
    description,
    stock,
    shopId,
    pic,
    price,
  });

  if (product) {
    console.log("Published!!!".green.bold);
    res.status(201).json({
      _id: product._id,
      productTitle: product.productTitle,
      categoryName: product.categoryName,
      description: product.description,
      stock: product.stock,
      shopId: product.shopId,
      pic: product.pic,
      ratings: product.ratings,
      price: product.price,
    });
  } else {
    console.log("Failed to Publish Product !!!".red.bold);
    res.status(400).json({
      error: "Failed to Publish Product !!!",
    });
    throw new error("Failed to Publish Product !!!");
  }
});

// const getAllProducts = asyncHandler(async (req, res) => {

//   const products = await Product.find();

//   if (products) {
//     console.log("Product fetched!!!".green.bold);
//     //send data to frontend in json format
//     res.status(201).json({
//       Products: products,
//     });
//   } else {
//     console.log("Failed fetch products !!!".red.bold);
//     //send error message to frontend
//     res.status(400).json({
//       error: "Failed to fetch products !!!",
//     });
//     throw new error("Failed to fetch products !!!");
//   }
// });

module.exports = {
  getAllProducts,
  addProduct,
};

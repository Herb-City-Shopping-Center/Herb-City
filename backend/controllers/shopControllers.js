const asyncHandler = require("express-async-handler");
const Shop = require("../models/shopModal");
const Product = require("../models/productModal");
const { green } = require("colors");
const genarateToken = require("../config/genarateToken");



const registerShop = asyncHandler(async (req, res) => {
  const { userId, shopName, shopDescription, shopAddress, shopImage } =
    req.body;

  if (!userId || !shopName || !shopDescription || !shopAddress || !shopImage) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  const shopExist = await Shop.findOne({ userId });

  if (shopExist) {
    console.log("Shop already exist!!!".red.bold);
    res.status(400).json({
      error: "Shop already exist !!!",
    });
    throw new error("Shop already exist!!!");
  }

  const shop = await Shop.create({
    userId,
    shopName,
    shopDescription,
    shopAddress,
    shopImage,
  });

  if (shop) {
    console.log("Registered!!!".green.bold);
    res.status(201).json({
      _id: shop._id,
      userId: shop.userId,
      shopName: shop.shopName,
      shopDescription: shop.shopDescription,
      shopAddress: shop.shopAddress,
      shopImage: shop.shopImage,
    });
  } else {
    console.log("Failed to Register Shop !!!".red.bold);
    res.status(400).json({
      error: "Failed to Register Shop !!!",
    });
    throw new error("Failed to Register Shop !!!");
  }
});

const getShopByUserId = asyncHandler(async (req, res) => {
  const { userId} =req.body;

  if (!userId) {
    res.send(400);
    throw new error("Please add user Id!!!");
  }

  const shop = await Shop.findOne({ userId });

  
  if (shop) {
    console.log("Found!!!".green.bold);
    res.status(201).json({
      _id: shop._id,
      userId: shop.userId,
      shopName: shop.shopName,
      shopDescription: shop.shopDescription,
      shopAddress: shop.shopAddress,
      ratings: shop.ratings,
      shopImage: shop.shopImage,
    });
  } else {
    console.log("Failed to Get Shop !!!".red.bold);
    res.status(400).json({
      error: "Failed to Get Shop !!!",
    });
    throw new error("Failed to Get Shop !!!");
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const { productTitle, categoryName, description, stock, shopId, pic,price } =
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

const getProductsByShopId = asyncHandler(async(req,res)=>{

  const { shopId } = req.body;
  console.log(shopId + " shop Id");
  const product = await Product.find({ shopId: { $in: shopId } });

  if (product) {
    res.send(product);
    console.log(product);
  } else {
    console.log("Invalid shopId for fetch product".red.bold);
    res.status(401);
    throw new error("Invalid shopId for fetch product");
  }

});

module.exports = {
  getProductsByShopId,
  addProduct,
  registerShop,
  getShopByUserId,
};

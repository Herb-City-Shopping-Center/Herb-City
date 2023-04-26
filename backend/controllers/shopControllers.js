const asyncHandler = require("express-async-handler");
const Shop = require("../models/shopModal");
const Product = require("../models/productModal");
const { green } = require("colors");
const genarateToken = require("../config/genarateToken");



const registerShop = asyncHandler(async (req, res) => {
  const { userId, shopName, shopDescription, shopAddress, shopImage } =
    req.body;

    console.log(userId, shopName, shopDescription, shopAddress, shopImage);

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


const deleteProduct = asyncHandler(async (req, res) => {
  //getting user id from body data
  const { _id } = req.body;

  //check if id is null
  if (!_id) {
    console.log("Id is null".red.bold);
    res.status(400).json({
      error: "User id is null",
    });
    throw new error("Error while deleting shop !!!");
  } else {
    try {
      //find user by id and delete fron database
      const product = await Product.findOneAndDelete({ _id: _id });

      //send success response message to the frontend
      if (product) {
        res.status(201).json({
          _id: _id,
        });
        console.log("Account deleted".red.bold);
      }
    } catch (error) {
      //send error response message to the frontend
      res.status(400).json({
        error: "Fail to delete account !!!",
      });
      throw new error("Error while deleting shop !!!" + error.message);
    }
  }
});





module.exports = {
  getProductsByShopId,
  registerShop,
  getShopByUserId,
  // updateProduct,
  deleteProduct,
};


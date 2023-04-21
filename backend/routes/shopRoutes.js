const express = require("express");
const router = express.Router();
const {
  registerShop,
  getShopByUserId,
  addProduct,
  getProductsByShopId,
} = require("../controllers/shopControllers");
const { protect } = require("../middleware/authMiddleware");

// router.route("/").post(registerUser).get(protect);
router.route("/registerShop").post(registerShop);
router.route("/getShopByUserId").post(getShopByUserId);
router.route("/addProduct").post(addProduct);
router.route("/getProductsByShopId").post(getProductsByShopId);

module.exports = router;

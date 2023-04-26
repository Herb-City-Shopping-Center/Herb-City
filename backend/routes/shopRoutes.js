const express = require("express");
const router = express.Router();
const {
  registerShop,
  getShopByUserId,
  getProductsByShopId,
  updateProduct,
  deleteProduct,
  // updateShop,
  // deleteShop,
} = require("../controllers/shopControllers");

const { protect } = require("../middleware/authMiddleware");

// router.route("/").post(registerUser).get(protect);
router.route("/registerShop").post(registerShop);
router.route("/getShopByUserId").post(getShopByUserId);
router.route("/getProductsByShopId").post(getProductsByShopId);
router.route("/deleteProduct").post(deleteProduct);
router.route("/updateProduct").post(updateProduct);

module.exports = router;

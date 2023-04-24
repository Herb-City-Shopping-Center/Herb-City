const express = require("express");
const router = express.Router();
const {
  registerShop,
  getShopByUserId,
  getProductsByShopId,
} = require("../controllers/shopControllers");

const { protect } = require("../middleware/authMiddleware");

// router.route("/").post(registerUser).get(protect);
router.route("/registerShop").post(registerShop);
router.route("/getShopByUserId").post(getShopByUserId);
router.route("/getProductsByShopId").post(getProductsByShopId);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  placeOrder,
  addCart,
  getCartList,
  removeCartItem,
} = require("../controllers/userController");removeCartItem;

router.route("/placeOrder").post(placeOrder);
router.route("/addCart").post(addCart);
router.route("/getCartList").post(getCartList);
router.route("/removeCartItem").post(removeCartItem);

module.exports = router;

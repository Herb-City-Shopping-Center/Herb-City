const express = require("express");
const router = express.Router();
const {
  placeOrder,
} = require("../controllers/userController");

router.route("/placeOrder").post(placeOrder);

module.exports = router;

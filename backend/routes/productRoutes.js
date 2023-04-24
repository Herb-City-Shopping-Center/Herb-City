const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.route("/addProduct").post(addProduct);
router.route("/getAllProducts").post(getAllProducts);

module.exports = router;

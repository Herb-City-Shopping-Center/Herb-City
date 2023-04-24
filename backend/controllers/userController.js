const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModal");
const Product = require("../models/productModal");
const { green } = require("colors");

const placeOrder = asyncHandler(async (req, res) => {
  const {
    fname,
    lname,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    country,
    quantity,
    productId,
    shopId,
    customerId,
    deliverMethod,
    unitPrice,
    total,
    title,
    pic,
  } = req.body;

  console.log(
    fname,
    lname,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    country,
    quantity,
    productId,
    shopId,
    customerId,
    deliverMethod,
    unitPrice,
    total,
    title,
    pic
  );

  if (
    !fname ||
    !lname ||
    !addressLine1 ||
    !addressLine2 ||
    !city ||
    !zip ||
    !country ||
    !quantity ||
    !productId ||
    !shopId ||
    !customerId ||
    !deliverMethod ||
    !unitPrice ||
    !total ||
    !title ||
    !pic
  ) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  const order = await Order.create({
    fname,
    lname,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    country,
    quantity,
    productId,
    shopId,
    customerId,
    deliverMethod,
    unitPrice,
    total,
    title,
    pic,
  });

  if (order) {
    console.log("Order placed!!!".green.bold);
    res.status(201).json({
      _id: order._id,
      fname: order.fname,
      addressLine1: order.addressLine1,
      addressLine2: order.addressLine2,
      city: order.city,
      state: order.state,
      zip: order.zip,
      country: order.country,
      quantity: order.quantity,
      shopId: order.shopId,
      customerId: order.customerId,
      deliveryMethod: order.deliveryMethod,
      unitPrice: order.unitPrice,
      total: order.total,
      title: order.title,
      pic: order.pic,
    });
  } else {
    console.log("Failed to Place Order !!!".red.bold);
    res.status(400).json({
      error: "Failed to Place Order !!!",
    });
    throw new error("Failed to Place Order !!!");
  }
});

module.exports = {
  placeOrder,
};

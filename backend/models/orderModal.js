
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    fname: { type: "String", required: true },
    lname: { type: "String", required: true },
    addressLine1: { type: "String", require: true },
    addressLine2: { type: "String", require: true },
    city: { type: "String", require: true },
    country: { type: "String", require: true },
    zip: { type: "String", require: true },
    quantity: { type: "String", require: true },
    productId: { type: "String", require: true },
    shopId: { type: "String", require: true },
    customerId: { type: "String", require: true },
    deliverMethod: { type: "String", require: true },
    unitPrice: { type: "String", require: true },
    total: { type: "String", require: true },
    title: { type: "String", require: true },
    status: { type: "String", default: "Pending" },
    pic: {
      type: "String",
      require: true,
      default:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1653393914/icons8-product-100_zr2jfl.png",
    },
  },
  {
    timestapms: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;


const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


const checkOut = asyncHandler(async (req, res) => {
  console.log("jhehej");
  const { data } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        // const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "lkr",
            product_data: {
              name: item.productTitle,
            },
            unit_amount: item.price * 100,
          },
          quantity: 5,
        };
      }),
      // success_url: `${process.env.CLIENT_URL}/success.html`,
      // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/admin",
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = {
  checkOut,
};

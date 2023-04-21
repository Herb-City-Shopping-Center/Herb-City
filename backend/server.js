const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./config.env" });
const shopRoutes = require("./routes/shopRoutes");
const checkOutRoutes = require("./routes/checkOutRoutes");

// const stripe = require("stripe")(
//   "sk_test_51MzLbqLBzkmE9gXzZVdaGPJdv1IUo6wwxNcdQ58ZCg0zB0KPTIhlHcK7sWZexzIEKe4bYmofn8Ol2FBNCN9PHDDh003zlR5NGI"
// );


const connectDB = require("./DB/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Api is running");
});

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
if (server) {
  console.log("Success".green.bold);
}



const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


app.use("/api/shop", shopRoutes);
app.use("/payment", checkOutRoutes);

app.use(errorHandler);
app.use(notFound);

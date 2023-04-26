import "./App.css";
import { Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import SellerDashboard from "./pages/SellerDashboard";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignUp,
  RedirectToSignIn,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";
import SellerOrders from "./Seller_Components/SellerOrders";
import SellerShop from './Seller_Components/SellerShop';
import SellerProducts from './Seller_Components/SellerProducts';
import ProductView from "./Client_Components/ProductView";
import Checkout from './Client_Components/orderCheckout/Checkout';
import Stripe from "./Client_Components/orderCheckout/Stripe";
import PaymentForm from "./Client_Components/orderCheckout/PaymentForm";
import Review from "./Client_Components/orderCheckout/Review";
import Cart from "./Client_Components/Cart";
import CustomerOrders from "./Client_Components/CustomerOrders";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <div className="App">
      <ClerkProvider publishableKey={clerkPubKey}>
        <Route path="/" component={HomePage} exact />
        <Route path="/product/view" component={ProductView} exact />

        <SignedIn>
          <Route path="/product/checkout" component={Checkout} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/seller/dashboard" component={SellerDashboard} exact />
          <Route path="/seller/orders" component={SellerOrders} exact />
          <Route path="/order/review" component={Review} exact />
          <Route path="/seller/shop" component={SellerShop} exact />
          <Route path="/orders" component={CustomerOrders} exact />
          <Route path="/seller/products" component={SellerProducts} exact />
          <Route path="/admin" component={AdminDashboard} exact />
        </SignedIn>

        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    </div>
  );
}

export default App;

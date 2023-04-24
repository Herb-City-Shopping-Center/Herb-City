import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Header from "../Header";
import Footer from './../Footer';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth,useUser } from "@clerk/clerk-react";
import Autocomplete from "@mui/material/Autocomplete";



const sections = [
  { title: "Home", url: "/" },
  { title: "Cart", url: "#" },
  { title: "Orders", url: "#" },
];

const deliveryMethods = [
  { label: "DHL", code: "DHL", cost: 1000 },
  { label: "Aramex", code: "Aramex", cost: 800 },
  { label: "UPS", code: "UPS", cost: 1200 },
  { label: "Pronto", code: "Pronto", cost: 500 },
  { label: "DomEx", code: "DomEx", cost: 800 },
];

const theme = createTheme();

export default function Checkout(props) {

    const { userId, actor } = useAuth();
      const { user } = useUser();


  const history = useHistory();
  const data = props.history.location.state?.data;
  console.log(data);

  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [addressLine1, setAddressLine1] = useState(null);
  const [addressLine2, setAddressLine2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [country, setCountry] = useState(null);
  const [quantity, setQuantity] = useState(data.qty);
  const [productId, setProductId] = useState(data._id);
  const [shopId, setShopId] = useState(data.shopId);
  const [customerId, setCustomerId] = useState(user?userId:null);
  const [deliveryMethod, setDeliveryMethod] = useState();
  const [unitPrice, setUnitPrice] = useState(data.price);
  const [total, setTotal] = useState(Number(data.price)*Number(data.qty));
  const [title, setTitle] = useState(data.productTitle);
  const [pic, setPic] = useState(data.pic);


  const back =()=>{
     history.push({
       pathname: "/product/view",
       state: {
         data: data,
       },
     });
  }

  const toPayment = async()=>{


    user ? setCustomerId(userId) : setCustomerId(null);

    setQuantity(data.qty);
    setProductId(data._id);
    setShopId(data.shopId);
    setUnitPrice(data.price);
    setTotal(Number(data.price) * Number(data.qty));
    setTitle(data.productTitle);
    setPic(data.pic);

    const deliverMethod = deliveryMethod.code;
    const methodCost = deliveryMethod.cost;

    setTotal(Number(data.price) * Number(data.qty) + Number(methodCost));

    const orderData = {
      "fname": fname,
      "lname": lname,
      "addressLine1": addressLine1,
      "addressLine2": addressLine2,
      "city": city,
      "state": state,
      "zip": zip,
      "country": country,
      "quantity": quantity,
      "productId": productId,
      "shopId": shopId,
      "customerId": customerId,
      "deliverMethod": deliverMethod,
      "unitPrice": unitPrice,
      "total": total,
      "title": title,
      "pic": pic,
    };

    if (
      !fname ||
      !lname ||
      !addressLine1 ||
      !addressLine2 ||
      !city ||
      !state ||
      !zip ||
      !country ||
      !quantity ||
      !deliveryMethod ||
      !unitPrice ||
      !total ||
      !title ||
      !pic ||
      !deliveryMethod ||
      !deliverMethod
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter required fields",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {

      localStorage.setItem("orderInfo", JSON.stringify(orderData));
      //setUser(JSON.parse(localStorage.getItem("userInfo")));

      fetch("/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [data],
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {

            window.location = url;  

          // history.push({
          //   pathname: url,
          //   state: {
          //     data: orderData,
          //   },
          // });

          // if (url === "http://localhost:3000/") {
          //   Swal.fire({
          //     icon: "success",
          //     title: "Thank you for shopping with Herb-City",
          //     text: "Order confirmed",
          //   }).then((result) => {
          //     if (result.isConfirmed) {
          //       window.location = url;
          //     }
          //   });
          // }
          // else{
          //   console.log("Hello");
          // } 

        })
        .catch((e) => {
          console.error(e.error);
        });
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <Header title="Herb-City Checkout" sections={sections} />
      </Container>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(e) => setFname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(e) => setLname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  onChange={(e) => setState(e.target.value)}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  onChange={(e) => setZip(e.target.value)}
                  autoComplete="shipping postal-code"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  onChange={(e) => setCountry(e.target.value)}
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={12}>

                <Autocomplete
                  id="clear-on-escape"
                  options={deliveryMethods}
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Delivery Service"
                      variant="standard"
                    />
                  )}
                  onChange={(event, newValue) => {
                    setDeliveryMethod(newValue);
                  }}
                />
                
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button sx={{ mt: 3, ml: 1 }} onClick={back}>
                Back
              </Button>

              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={toPayment}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
              
}



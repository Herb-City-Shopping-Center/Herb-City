import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Header";
import Footer from "./../Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import axios from "axios";



const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const theme = createTheme();

const sections = [
  { title: "Home", url: "/" },
  { title: "Cart", url: "#" },
  { title: "Orders", url: "#" },
];

export default function Review(props) {


  const [orderData, setOrderData] = useState();

  useEffect(() => {
    setOrderData(JSON.parse(localStorage.getItem("orderInfo")));

  }, [])

    
  
  if(!orderData){
    return(
      <h3>
        Loading...
      </h3>
    )
  }
  else{
 console.log(orderData);

    const MakeOrder = async (url) => {

      const [fname, setFname] = useState(orderData.fname);
      const [lname, setLname] = useState(null);
      const [addressLine1, setAddressLine1] = useState(null);
      const [addressLine2, setAddressLine2] = useState(null);
      const [city, setCity] = useState(null);
      const [state, setState] = useState(null);
      const [zip, setZip] = useState(null);
      const [country, setCountry] = useState(null);
      const [quantity, setQuantity] = useState(null);
      const [productId, setProductId] = useState(null);
      const [shopId, setShopId] = useState(null);
      const [customerId, setCustomerId] = useState(null);
      const [deliveryMethod, setDeliveryMethod] = useState(null);
      const [unitPrice, setUnitPrice] = useState(null);
      const [total, setTotal] = useState(null);
      const [title, setTitle] = useState(null);
      const [pic, setPic] = useState(null);

      console.log(orderData);



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
        !pic
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter required fields",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      } else {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "http://localhost:5000/api/user/placeOrder",
            {
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
              deliveryMethod,
              unitPrice,
              total,
              title,
              pic,
            },
            config
          );
          Swal.fire({
            icon: "success",
            title: "Thank you for shopping with Herb-City",
            text: "Order confirmed",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location = "http://localhost:3000/";
            }
          });
          console.log(data);
        } catch (error) {
          console.log(error.response.data.error);

          Swal.fire({
            icon: "error",
            title: "Failed to placing orderrrr",
            text: error.response.data.error,
          });
        }
      }
    };

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
                Confirm Order
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Order summary
                  </Typography>
                  <List disablePadding>
                    {products.map((product) => (
                      <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                          primary={product.name}
                          secondary={product.desc}
                        />
                        <Typography variant="body2">{product.price}</Typography>
                      </ListItem>
                    ))}

                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText primary="Total" />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        $34.06
                      </Typography>
                    </ListItem>
                  </List>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                      </Typography>
                      <Typography gutterBottom>John Smith</Typography>
                      <Typography gutterBottom>{addresses.join(", ")}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                      </Typography>
                      <Grid container>
                        {payments.map((payment) => (
                          <React.Fragment key={payment.name}>
                            <Grid item xs={6}>
                              <Typography gutterBottom>{payment.name}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography gutterBottom>
                                {payment.detail}
                              </Typography>
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button sx={{ mt: 3, ml: 1 }} >
                  Back
                </Button>

                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={MakeOrder}
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
}

import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Client_Components/Header";
import MainFeaturedPost from "../Client_Components/MainFeaturedPost";
import FeaturedPost from "../Client_Components/FeaturedPost";
import Footer from "../Client_Components/Footer";
import Products from "../Client_Components/Products";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

const sections = [
  { title: "Home", url: "/" },
  { title: "Cart", url: "#" },
  { title: "Orders", url: "#" },
];

const theme = createTheme();

function ProductView(props) {

  const history = useHistory();
  const data = props.history.location.state?.data;

  console.log(data);

  const [quantity, setQuantity] = useState();

  const checkOut = () => {
    var isSuccess = true;
    if (!quantity) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter quantity",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      isSuccess = false;
    }
    if (quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Quantity must greater than 0",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      isSuccess = false;
    }
    if (quantity > Number(data.stock)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Item stock is not enough",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      isSuccess = false;
    }

    if (isSuccess) {

      data.qty = quantity;
      history.push({
        pathname: "/product/checkout",
        state: {
          data: data,
        },
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <Header title="Welcome to Herb-City" sections={sections} />

        <Grid
          container
          component="main"
          sx={{ maxHeight: "70vh", marginTop: "20px" }}
        >
          <Grid item md={5}>

            <Avatar
              src={data.pic ? data.pic : null}
              sx={{ width: "400px", height: "400px", marginLeft: "30px" }}
              variant="square"
            ></Avatar>
            
          </Grid>
          <Grid item md={7}>
            <h3 style={{ textAlign: "left", display: "flex" }}>
              {data.productTitle}
            </h3>

            <p style={{ textAlign: "left", display: "flex" }}>
              Category : {data.categoryName}
            </p>

            <h5 style={{ textAlign: "left", display: "flex" }}>
              <u>Description</u>
            </h5>

            <p style={{ display: "flex" }}>{data.description}</p>

            <h5 style={{ textAlign: "left", display: "flex" }}>
              Unit Price : {data.price}
            </h5>
            <h5 style={{ textAlign: "left", display: "flex" }}>
              Stock : {data.stock} pcs
            </h5>

            <TextField
              id="standard-number"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              sx={{ marginRight: "500px" }}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <Grid container spacing={2} sx={{ marginTop: "80px" }}>
              <Grid item xs={6}>
                <Tooltip title="to check out" placement="top-end">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={checkOut}
                    sx={{ width: "100%" }}
                  >
                    Buy
                    <LocalMallIcon />
                  </Button>
                </Tooltip>
              </Grid>

              <Grid item xs={6}>
                <Tooltip title="add to wishlist" placement="top-end">
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

export default ProductView;

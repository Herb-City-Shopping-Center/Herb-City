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
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Chip from '@mui/material/Chip';


const sections = [
  { title: "Home", url: "/" },
  { title: "Cart", url: "/cart" },
  { title: "Orders", url: "/orders" },
];

const theme = createTheme();

function ProductView(props) {
  const history = useHistory();
  const data = props.history.location.state?.data? props.history.location.state?.data : props;

  console.log(data);

  const { userId, actor } = useAuth();
  const { user } = useUser();

  const [quantity, setQuantity] = useState();

  const [productImage, setProductImage] = useState(data.pic);
  const [productTitle, setProductTitle] = useState(data.productTitle);
  const [productId, setProductId] = useState(data._id);
  const [shopId, setShopId] = useState(data.shopId);
  const [productPrice, setProductPrice] = useState(data.price);
  const [customerId, setCustomerId] = useState(user ? userId : null);

  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [updateFailOpen, setUpdateFailOpen] = React.useState(false);
  const [cartAdded, setCartAdded] = React.useState(false);
  const [wishListAdded, setWishListAdded] = React.useState(
    "Click to add wishlist"
  );
  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState(null);

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
      data.quantity = quantity;
      console.log(data);
      history.push({
        pathname: "/product/checkout",
        state: {
          data: [data],
        },
      });
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUpdateFailOpen(false);
    setUpdateOpen(false);
  };

  const addWishlist = async () => {
    setProductId(data._id);
    setProductImage(data.pic);
    setProductPrice(data.price);
    setProductTitle(data.productTitle);
    setCustomerId(user ? userId : null);
    setQuantity(quantity);
    setShopId(data.shopId);

    if (
      !productImage ||
      !productTitle ||
      !productPrice ||
      !productId ||
      !shopId ||
      !customerId ||
      !quantity
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter quantity",
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
          "http://localhost:5000/api/user/addCart",
          {
            productId,
            productImage,
            productPrice,
            productTitle,
            customerId,
            shopId,
            quantity,
          },
          config
        );
        console.log(data);
        setUpdateOpen(true);
        setCartAdded(true);
        setWishListAdded("Added to wishlist");
      } catch (error) {
        console.log(error.response.data.error);
        setUpdateFailOpen(true);
        setCartAdded(false);
      }
    }
  };

  const addFeedback = async () =>{

    if (rating==0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add rating",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
    else if (!feedback) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add feedback message",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
    else{
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5003/api/user/feedback/add-feedback-product",
          {
            productId,
            feedback,
          },
  
          config
        );
        console.log(data);
        setRating(0);
        setFeedback("")
        Swal.fire({
          icon: "success",
          title: "Feedback Added",
          text: "Your feedback has been added to this product",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Ooops...",
          text: "Your feedback has not added to this product",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        console.log("Error while adding feedback");
        console.log(error.message);
      }
    }

  }

  const viewShop  =async () =>{
    history.push({
      pathname: "/shop/view",
      state: {
        data: data,
      },
    });
  }

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
          <div style={{ textAlign: "left", display: "flex" }}>
          <Button variant="outlined" color="error" onClick={viewShop}>View Shop</Button>
          </div>
          
            <h3 style={{ textAlign: "left", display: "flex" }}>
              {data.productTitle}
            </h3>

            <p style={{ textAlign: "left", display: "flex" }}>
              Category : {data.categoryName}
            </p>

            <h5 style={{ textAlign: "left", display: "flex" }}>
              MRP : {data.price}.00 lkr
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
              <Snackbar
                open={updateOpen}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  severity="success"
                  sx={{ width: "100%" }}
                  onClose={handleClose}
                >
                  Added to cart
                </Alert>
              </Snackbar>

              <Snackbar
                open={updateFailOpen}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  severity="error"
                  sx={{ width: "100%" }}
                  onClose={handleClose}
                >
                  Failed to adding cart
                </Alert>
              </Snackbar>
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
                <Tooltip title={wishListAdded} placement="top-end">
                  <IconButton aria-label="add to favorites">
                    {cartAdded ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteIcon onClick={addWishlist} />
                    )}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      
      <Container>
            <h5 style={{ textAlign: "left", display: "flex",fontSize:"20px" }}>
              <u>Description</u>
            </h5>
            <p style={{ display: "flex" }}>{data.description}</p>
      </Container>

          <Container>
          <h5 style={{ textAlign: "left", display: "flex",fontSize:"20px" }}>
              <u>Feedback section</u>
            </h5>
          <List
            sx={{
              width: '100%',
              maxWidth: 560,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {data.ratings.map((rating) => (

                  
                    <ListItem key={`item-${rating}`}>
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={rating} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Rating name="read-only" value={3} readOnly />}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            feedback
                          </Typography>
                          {" — "+rating}
                        </React.Fragment>
                      }
                    />
                    
                  </ListItem>
                    </ListItem>

            ))}
          </List>

            <Box
              sx={{
                '& > legend': { mt: 2 },
                textAlign:"left",
                display:"grid"
                
              }}
            >
              <Typography component="legend"><u>Add feedback to product</u></Typography>
              <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              />
            <TextField
              id="standard-multiline-static"
              label="Add Feedback"
              multiline
              rows={2}
              value={feedback}
              variant="standard"
              sx={{width:560}}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button variant="contained" color="secondary" sx={{width:"200px",marginTop:"20px"}} onClick={addFeedback}>
            Submit
          </Button>
            </Box>
            
            </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

export default ProductView;

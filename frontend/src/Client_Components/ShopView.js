import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Client_Components/Header";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import axios from "axios";
import { Avatar } from "@mui/material";
import Divider from '@mui/material/Divider';
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Products from "./Products";
import Footer from "./Footer";


const sections = [
    { title: "Home", url: "/" },
    { title: "Cart", url: "/cart" },
    { title: "Orders", url: "/orders" },
  ];

const theme = createTheme();

function ShopView(props) {

    const data = props.history.location.state?.data? props.history.location.state?.data : props;

    const [shopId,setShopId] = useState(data.shopId);
    const [shop,setShop] = useState(null);
    const [rating,setRating] = useState(0);
    const [feedback,setFeedback] = useState(null);
    const [products,setProducts] = useState(null);

    const getShop = async () => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "http://localhost:5000/api/user/getShopByShopId",
            {
                shopId,
            },
    
            config
          );
          console.log(data);
          setShop(data);
        } catch (error) {
          console.log("Error while getting shop");
          console.log(error);
        }
      };

      const getProductbyShopId = async()=>{
        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "http://localhost:5000/api/user/getProductbyShopId",
              {
                  shopId,
              },
      
              config
            );
            console.log(data);
            setProducts(data);
          } catch (error) {
            console.log("Error while getting shop");
            console.log(error);
          }
      }; 
    
      useEffect(() => {
        getShop();
        getProductbyShopId();
      }, []);


      const addFeedback = async()=>{
        if (rating===0) {
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
                "http://localhost:5003/api/user/feedback/add-feedback-shop",
                {
                  shopId,
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
                text: "Your feedback has been added to this shop",
                footer: '<a href="">Why do I have this issue?</a>',
              });
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Ooops...",
                text: "Your feedback has not added to this shop",
                footer: '<a href="">Why do I have this issue?</a>',
              });
              console.log("Error while adding feedback");
              console.log(error.message);
            }
          }
      }; 
      
    


      if(!shop){
        return(
            <ThemeProvider theme={theme}>
                <CssBaseline />

                    <Container>
                        <Header title="Welcome to Herb-City" sections={sections} />

                            <Grid
                            container
                            component="main"
                            sx={{ maxHeight: "70vh", marginTop: "20px" }}
                            >
                                <h3>Loading....</h3>
                            </Grid>
                    </Container>
            </ThemeProvider>
        );
      }
      else{
        return(
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
                                    src={shop.shopImage ? shop.shopImage : null}
                                    sx={{ width: "300px", height: "300px", marginLeft: "30px" }}
                                    alt="S"
                                    ></Avatar>

                                    <h5 style={{ textAlign: "left", display: "flex",fontSize:"20px" }}>
                                        <u>Feedbacks</u>
                                        </h5>

                                    <List
                                        sx={{
                                        width: '100%',
                                        maxWidth: 560,
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 200,
                                        '& ul': { padding: 0 },
                                        }}
                                        subheader={<li />}
                                    >
                                        {shop.ratings.length>0?(
                                            shop.ratings.map((rating) => (

                                            
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

                                            ))
                                        ):(
                                            <div>No feedbacks</div>
                                        )}
                                        
                                    </List>
                                </Grid>

                                <Grid item md={7}>
                                <h3 style={{ textAlign: "left", display: "flex" }}>
                                <u>{shop.shopName}</u>
                                </h3>

                                <h5 style={{ textAlign: "left", display: "flex" }}>
                                    Location : {shop.shopAddress}
                                </h5>

                                <h4 style={{ textAlign: "left", display: "flex" }}>
                                <u>About</u>
                                </h4>
                                <p style={{ textAlign: "left", display: "flex" }}>
                                    {shop.shopDescription}
                                </p>
                                
                                
                {/* feedback section */}
                                        <Box
                                        sx={{
                                            mt:20,
                                            textAlign:"left",
                                        }}
                                        >
                                        <Typography component="legend"><u>Add feedback to shop</u></Typography>
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
                                        
                                         {/* feedback section */}
                                </Grid>


                            </Grid>
                            {/* Shop product section */}
                            <h3 style={{marginTop:"40px"}}><u>Products</u></h3>
                            <Divider/>

                            <Grid container spacing={4} sx={{marginTop:"20px"}}>
                                {products? (
                                products.map((product) => (
                                    <Products key={product.productTitle} product={product} />
                                ))
                                ) : (
                                <div>Loading...</div>
                                )}
                            </Grid>

                            {/* Shop product section */}
                    </Container>
                    <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
        </ThemeProvider>
        
        );
      }

}
export default ShopView;
import * as React from "react";
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



const sections = [
  { title: "Home", url: "/" },
  { title: "Cart", url: "#" },
  { title: "Orders", url: "#" },
];

const mainFeaturedPost = {
  title: "Sri Lanka's Largets Ayurvedic/Herbal medicines and supplements Store",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  // image:
  //   "https://res.cloudinary.com/cake-lounge/image/upload/v1681985800/farmherbs-kajalmela-web-banner_zos46i.jpg",
  image:
    "https://res.cloudinary.com/cake-lounge/image/upload/v1681985807/banner_3_1_pbspna.jpg",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const products = [
  {
    _id: "6441b08f78c8c9251b778964",
    productTitle: "Featured post",
    categoryName: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    stock: "10",
    shopId: "111111111",
    ratings: ["Good", "nice"],
    price: "550.00",
    pic: "http://res.cloudinary.com/cake-lounge/image/upload/v1682026619/xlwkyyrp3r9pxfsh1gwh.jpg",
  },
  {
    _id: "6441b08f78c8c9251b778964",
    productTitle: "Featured post",
    categoryName: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    stock: "20",
    shopId: "111111111",
    ratings: ["Good", "nice"],
    price: "550.00",
    pic: "http://res.cloudinary.com/cake-lounge/image/upload/v1682026619/xlwkyyrp3r9pxfsh1gwh.jpg",
  },
  {
    _id: "6441b08f78c8c9251b778964",
    productTitle: "Featured post",
    categoryName: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    stock: "30",
    shopId: "111111111",
    ratings: ["Good", "nice"],
    price: "550.00",
    pic: "http://res.cloudinary.com/cake-lounge/image/upload/v1682026619/xlwkyyrp3r9pxfsh1gwh.jpg",
  },
  {
    _id: "6441b08f78c8c9251b778964",
    productTitle: "Featured post",
    categoryName: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    stock: "40",
    shopId: "111111111",
    ratings: ["Good", "nice"],
    price: "550.00",
    pic: "http://res.cloudinary.com/cake-lounge/image/upload/v1682026619/xlwkyyrp3r9pxfsh1gwh.jpg",
  },
  {
    _id: "6441b08f78c8c9251b778964",
    productTitle: "Featured post",
    categoryName: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    stock: "50",
    shopId: "111111111",
    ratings: ["Good", "nice"],
    price: "550.00",
    pic: "http://res.cloudinary.com/cake-lounge/image/upload/v1682026619/xlwkyyrp3r9pxfsh1gwh.jpg",
  },
];


const theme = createTheme();

export default function Blog() {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <Header title="Welcome to Herb-City" sections={sections} />

        <main>
          <MainFeaturedPost post={mainFeaturedPost} />

          <Toolbar
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="inherit"
              align="center"
              noWrap
              sx={{ flex: 1, fontStyle: "italic" }}
            >
              Most Popular Products
            </Typography>
          </Toolbar>

          <Grid container spacing={4}>
            {products.map((product) => (
              <Products
                key={product.productTitle}
                product={product}
              />
            ))}
          </Grid>
        </main>
      </Container>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

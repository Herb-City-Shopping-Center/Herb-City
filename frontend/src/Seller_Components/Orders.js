// import * as React from "react";
// import Tooltip from "@mui/material/Tooltip";
// import Button from "@mui/material/Button";
// import Title from "./Title";
// import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import AddBoxIcon from "@mui/icons-material/AddBox";

// import Box from "@mui/material/Box";
// import { Grid } from "@mui/material";
// import Divider from "@mui/material/Divider";
// import SettingsIcon from "@mui/icons-material/Settings";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardActions from "@mui/material/CardActions";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import IconButton from "@mui/material/IconButton";
// import ShareIcon from "@mui/icons-material/Share";
// import axios from "axios";
// import Skeleton from "@mui/material/Skeleton";
// import Stack from "@mui/material/Stack";
// import Swal from "sweetalert2";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import validator from "validator";
// import LinearProgress from "@mui/material/LinearProgress";
// import MuiAlert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
// import ClearIcon from "@mui/icons-material/Clear";
// import Paper from "@mui/material/Paper";
// import { Avatar } from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
// import CardHeader from "@mui/material/CardHeader";
// import CardContent from "@mui/material/CardContent";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { red } from "@mui/material/colors";
// import EditIcon from "@mui/icons-material/Edit";

// import { useAuth } from "@clerk/clerk-react";

// // // Generate Order Data
// // function createData(id, date, name, shipTo, paymentMethod, amount) {
// //   return { id, date, name, shipTo, paymentMethod, amount };
// // }

// // const categories = [
// //   { label: "Suppliments", code: "Suppliments" },
// //   { label: "Beauty", code: "Beauty" },
// //   { label: "Grocery", code: "Grocery" },
// //   { label: "Bath", code: "Bath" },
// //   { label: "Baby", code: "Baby" },
// //   { label: "Healthy Home", code: "HealthyHome" },
// //   { label: "Pets", code: "Pets" },
// // ];

// function preventDefault(event) {
//   event.preventDefault();
// }

// const SellerServiceBaseUrl = process.env.REACT_APP_SELLER_SERVICE_BASE_URL;;


// export default function Orders() {
//   const { userId, actor } = useAuth();

// //   const [addProductState, setAddProductState] = useState(false);
// //   const [productUpdateState, setProductUpdateState] = useState(false);
// //   const [currentUpdate, setCurrentUpdate] = useState(null);

//   const [shopId, setShopId] = React.useState(
//     JSON.parse(localStorage.getItem("shopInfo"))._id
//   );
// //   const [productTitle, setProductTitle] = React.useState(null);
// //   const [category, setCategory] = React.useState(null);
// //   const [description, setDescription] = React.useState(null);
// //   const [stock, setStock] = React.useState(null);
// //   const [price, setPrice] = React.useState(null);
// //   const [pic, setPic] = React.useState(null);

// const [fname, setFname] = React.useState(null);
// const [city, setCity] = React.useState(null);
// const [country, setCountry] = React.useState(null);
// const [diliveryMethod, setDiliveryMethod] = React.useState(null);
// const [title, setTitle] = React.useState(null);
// const [total, setTotal] = React.useState(null);

//   const [open, setOpen] = React.useState(false);
//   const [errorOpen, setErrorOpen] = React.useState(false);
//   const [progress, setProgress] = React.useState("none");
// //   const [updateOpen, setUpdateOpen] = React.useState(false);
// //   const [updateFailOpen, setUpdateFailOpen] = React.useState(false);
// //   const [updateProgress, setUpdateProgress] = React.useState("none");
// //   const [updateBtnOpacity, setUpdateBtnOpacity] = React.useState(1);
//   const [orders, setOrders] = React.useState(null);

// //   const fileInput = React.useRef();

//   const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

// //   const changeState = () => {
// //     setAddProductState(false);
// //   };
// //   const changeUpdateState = () => {
// //     setCurrentUpdate(null);
// //     setProductUpdateState(false);
// //   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//     setErrorOpen(false);
//     // setUpdateFailOpen(false);
//     // setUpdateOpen(false);
//   };

//   const getOrdersByShopId = async () => {
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         "http://localhost:6002/api/shop/getOrdersByShopId",
//         {
//           shopId,
//         },

//         config
//       );
//       console.log(data);
//       setOrders(data);
//     } catch (error) {
//       console.log("Error getting orders");
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getOrdersByShopId();
//   }, []);

// //   const editProduct = (product) => {
// //     setCurrentUpdate(product);
// //     console.log("-------------------------------");
// //     console.log(product);
// //     setProductTitle(product.productTitle);
// //     setStock(product.stock);
// //     setPrice(product.price);
// //     setDescription(product.description);
// //     setPic(product.pic);
// //     setCategory(product.categoryName);
// //     setProductUpdateState(true);
// //   };

// //   const postDetails = (pic) => {
// //     setProgress("block");

// //     if (pic === undefined) {
// //       console.log("Plese upload an image!!!");
// //     }
// //     if (pic.type === "image/jpeg" || "image.png") {
// //       const data = new FormData();

// //       data.append("file", pic);

// //       data.append("upload_preset", "userImages");

// //       data.append("cloud_name", "cake-lounge");

// //       fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload", {
// //         method: "post",
// //         body: data,
// //       })
// //         .then((res) => res.json())

// //         .then((data) => {
// //           //const imageUrl = data.url.toString();
// //           setPic(data.url.toString());

// //           console.log(pic);
// //           setProgress("none");
// //           setOpen(true);
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //           setProgress("none");
// //           setErrorOpen(true);
// //         });
// //     } else {
// //       setProgress("none");
// //       console.log("Plese upload an image!!!");
// //     }
// //   };

// //   const publish = async (event) => {
// //     setUpdateProgress("block");
// //     setUpdateBtnOpacity(0.5);
// //     var isSuccess = true;
// //     if (!productTitle || !description || !description || !stock || !price) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Oops...",
// //         text: "Please fill all the fields",
// //         footer: '<a href="">Why do I have this issue?</a>',
// //       });
// //       isSuccess = false;
// //       setUpdateBtnOpacity(1);
// //       setUpdateProgress("none");
// //     }

// //     if (isSuccess) {
// //       const categoryName = category.code;

// //       try {
// //         const config = {
// //           headers: {
// //             "Content-type": "application/json",
// //           },
// //         };
// //         const { data } = await axios.post(
// //           "http://localhost:6002/api/shop/addProduct",
// //           {
// //             productTitle,
// //             categoryName,
// //             description,
// //             stock,
// //             shopId,
// //             pic,
// //             price,
// //           },
// //           config
// //         );
// //         Swal.fire({
// //           icon: "success",
// //           title: "Published",
// //           text: "Product published successfully",
// //         });
// //         console.log(data);
// //         setUpdateProgress("none");
// //         setUpdateOpen(true);
// //         setUpdateBtnOpacity(1);
// //         setAddProductState(false);
// //       } catch (error) {
// //         setUpdateProgress("none");
// //         setUpdateFailOpen(true);
// //         setUpdateBtnOpacity(1);
// //         console.log(error.response.data.error);

// //         Swal.fire({
// //           icon: "error",
// //           title: "Oops...",
// //           text: error.response.data.error,
// //         });
// //       }
// //     }
// //   };

// //   const update = async (product) => {

// //     var _id = product._id;

// //     if(!category){
// //       setCategory(product.categoryName);
// //     }
    

// //     setUpdateProgress("block");
// //     setUpdateBtnOpacity(0.5);
// //     var isSuccess = true;


// //     console.log(
// //       productTitle,
// //       description,
// //       stock,
// //       price,
// //       pic,
// //       _id,
// //       category
// //     );
    
// //     if (
// //       !productTitle ||
// //       !description ||
// //       !stock ||
// //       !price ||
// //       !pic ||
// //       !_id ||
// //       !category
// //     ) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Oops...",
// //         text: "Please fill all the fields",
// //         footer: '<a href="">Why do I have this issue?</a>',
// //       });
// //       isSuccess = false;
// //       setUpdateBtnOpacity(1);
// //       setUpdateProgress("none");
// //     }

// //     if (isSuccess) {
      

// //       try {
// //         const config = {
// //           headers: {
// //             "Content-type": "application/json",
// //           },
// //         };
// //         const { data } = await axios.post(
// //           "http://localhost:6002/api/shop/updateProduct",
// //           {
// //             _id,
// //             productTitle,
// //             category,
// //             description,
// //             stock,
// //             pic,
// //             price,
// //           },
// //           config
// //         );
// //         Swal.fire({
// //           icon: "success",
// //           title: "Updated",
// //           text: "Product updated successfully",
// //         });
// //         console.log(data);
// //         setUpdateProgress("none");
// //         setUpdateOpen(true);
// //         setUpdateBtnOpacity(1);
// //         setAddProductState(false);
// //         setProductUpdateState(false);
// //         setCurrentUpdate(null);
// //         getProductsByShopId();
// //       } catch (error) {
// //         setUpdateProgress("none");
// //         setUpdateFailOpen(true);
// //         setUpdateBtnOpacity(1);
// //         console.log(error.response.data.error);

// //         Swal.fire({
// //           icon: "error",
// //           title: "Oops...",
// //           text: error.response.data.error,
// //         });
// //       }
// //     }
// //   };
// //   const deleteProduct = async (id) => {

// //     if(!id){
// //       alert("Id is null");
// //     }
// //     else{
// //     Swal.fire({
// //       title: "Are you sure to delete product?",
// //       text: "You won't be able to revert this!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#3085d6",
// //       cancelButtonColor: "#d33",
// //       confirmButtonText: "Yes, Delete it!",
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         try {
// //         const config = {
// //           headers: {
// //             "Content-type": "application/json",
// //           },
// //         };
// //         const { data } = axios.post(
// //           "http://localhost:6002/api/shop/deleteProduct",
// //           {
// //             id,
// //           },
// //           config
// //         );
// //         Swal.fire({
// //           icon: "success",
// //           title: "Deleted",
// //           text: "Product deleted successfully",
// //         });
// //         console.log(data);
// //         setUpdateProgress("none");
// //         setUpdateBtnOpacity(1);
// //         setAddProductState(false);
// //         setProductUpdateState(false);
// //         setCurrentUpdate(null);
// //         getProductsByShopId();
// //       } catch (error) {
// //         setUpdateProgress("none");
// //         setUpdateFailOpen(true);
// //         setUpdateBtnOpacity(1);
// //         console.log(error.response.data.error);

// //         Swal.fire({
// //           icon: "error",
// //           title: "Oops...",
// //           text: error.response.data.error,
// //         });
// //       }
// //       }
// //     });
// //   }
   
// //   };

// //   if (addProductState && !productUpdateState) {
// //     return (
// //       <div className="edit_form">
// //         <input
// //           ref={fileInput}
// //           type="file"
// //           style={{ display: "none" }}
// //           accept="image/*"
// //           onChange={(e) => postDetails(e.target.files[0])}
// //         />

// //         <Box sx={{ maxWidth: "50%", marginTop: "50px", marginLeft: "200px" }}>
// //           <Tooltip title="Close" placement="top-end">
// //             <IconButton sx={{ marginLeft: "35vw" }} onClick={changeState}>
// //               <ClearIcon sx={{ display: "flex" }} />
// //             </IconButton>
// //           </Tooltip>
// //           <Typography variant="h6" gutterBottom>
// //             Add Product
// //           </Typography>
// //           <Avatar
// //             src={pic ? pic : null}
// //             sx={{ width: "300px", height: "300px", marginLeft: "140px" }}
// //             variant="square"
// //           >
// //             Add product image
// //           </Avatar>

// //           <Tooltip title="Change or add profile image">
// //             <Button color="success" onClick={() => fileInput.current.click()}>
// //               Upload Image
// //             </Button>
// //           </Tooltip>
// //           <Box sx={{ width: "100%", display: progress }}>
// //             <LinearProgress />
// //           </Box>
// //           <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
// //             <Alert
// //               severity="success"
// //               sx={{ width: "100%" }}
// //               onClose={handleClose}
// //             >
// //               Image uploaded!
// //             </Alert>
// //           </Snackbar>
// //           <Snackbar
// //             open={errorOpen}
// //             autoHideDuration={6000}
// //             onClose={handleClose}
// //           >
// //             <Alert
// //               severity="error"
// //               sx={{ width: "100%" }}
// //               onClose={handleClose}
// //             >
// //               Image not uploaded!
// //             </Alert>
// //           </Snackbar>
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} sm={12}>
// //               <TextField
// //                 required
// //                 id="productTitle"
// //                 name="productTitle"
// //                 label="Product Title"
// //                 fullWidth
// //                 autoComplete="given-name"
// //                 variant="standard"
// //                 onChange={(e) => setProductTitle(e.target.value)}
// //               />
// //             </Grid>

// //             <Grid item xs={12} sm={12}>
// //               <Autocomplete
// //                 id="clear-on-escape"
// //                 options={categories}
// //                 clearOnEscape
// //                 renderInput={(params) => (
// //                   <TextField
// //                     {...params}
// //                     label="Select Category"
// //                     variant="standard"
// //                   />
// //                 )}
// //                 onChange={(event, newValue) => {
// //                   setCategory(newValue);
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 required
// //                 fullWidth
// //                 id="stock"
// //                 label="Item Qty"
// //                 name="stock"
// //                 variant="standard"
// //                 onChange={(e) => setStock(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 required
// //                 fullWidth
// //                 id="price"
// //                 label="Unit Price"
// //                 name="price"
// //                 variant="standard"
// //                 onChange={(e) => setPrice(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 required
// //                 fullWidth
// //                 id="description"
// //                 label="Description"
// //                 multiline
// //                 rows={3}
// //                 maxRows={6}
// //                 variant="standard"
// //                 name="description"
// //                 autoComplete="family-name"
// //                 onChange={(e) => setDescription(e.target.value)}
// //               />
// //             </Grid>
// //           </Grid>
// //           <Box sx={{ width: "100%", display: updateProgress }}>
// //             <LinearProgress />
// //           </Box>
// //           <Grid item xs={12} sx={{ marginTop: "50px", marginBottom: "50px" }}>
// //             <Snackbar
// //               open={updateOpen}
// //               autoHideDuration={6000}
// //               onClose={handleClose}
// //             >
// //               <Alert
// //                 severity="success"
// //                 sx={{ width: "100%" }}
// //                 onClose={handleClose}
// //               >
// //                 Product Published
// //               </Alert>
// //             </Snackbar>

// //             <Snackbar
// //               open={updateFailOpen}
// //               autoHideDuration={6000}
// //               onClose={handleClose}
// //             >
// //               <Alert
// //                 severity="error"
// //                 sx={{ width: "100%" }}
// //                 onClose={handleClose}
// //               >
// //                 Failed to publish
// //               </Alert>
// //             </Snackbar>

// //             <Grid container spacing={2}>
// //               <Grid item xs={12}>
// //                 <Tooltip
// //                   title="Publish your product to customers"
// //                   placement="top-end"
// //                 >
// //                   <Button
// //                     variant="contained"
// //                     color="success"
// //                     onClick={publish}
// //                     sx={{ opacity: updateBtnOpacity, marginLeft: "40px" }}
// //                   >
// //                     Publish Product
// //                   </Button>
// //                 </Tooltip>
// //               </Grid>
// //             </Grid>
// //           </Grid>
// //         </Box>
// //       </div>
// //     );
// //   } else if (!products) {
// //     <div>
// //       <h4>Loading...</h4>
// //     </div>;
// //   } else if (productUpdateState && !addProductState) {
// //     return (
// //       <div className="edit_form">
// //         <input
// //           ref={fileInput}
// //           type="file"
// //           style={{ display: "none" }}
// //           accept="image/*"
// //           onChange={(e) => postDetails(e.target.files[0])}
// //         />

// //         <Box sx={{ maxWidth: "50%", marginTop: "50px", marginLeft: "200px" }}>
// //           <Tooltip title="Close" placement="top-end">
// //             <IconButton sx={{ marginLeft: "35vw" }} onClick={changeUpdateState}>
// //               <ClearIcon sx={{ display: "flex" }} />
// //             </IconButton>
// //           </Tooltip>
// //           <Typography variant="h6" gutterBottom>
// //             Update Product
// //           </Typography>
// //           <Avatar
// //             src={currentUpdate.pic ? currentUpdate.pic : null}
// //             sx={{ width: "300px", height: "300px", marginLeft: "140px" }}
// //             variant="square"
// //           >
// //             Add product image
// //           </Avatar>

// //           <Tooltip title="Change or add profile image">
// //             <Button color="success" onClick={() => fileInput.current.click()}>
// //               Upload Image
// //             </Button>
// //           </Tooltip>
// //           <Box sx={{ width: "100%", display: progress }}>
// //             <LinearProgress />
// //           </Box>
// //           <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
// //             <Alert
// //               severity="success"
// //               sx={{ width: "100%" }}
// //               onClose={handleClose}
// //             >
// //               Image uploaded!
// //             </Alert>
// //           </Snackbar>
// //           <Snackbar
// //             open={errorOpen}
// //             autoHideDuration={6000}
// //             onClose={handleClose}
// //           >
// //             <Alert
// //               severity="error"
// //               sx={{ width: "100%" }}
// //               onClose={handleClose}
// //             >
// //               Image not uploaded!
// //             </Alert>
// //           </Snackbar>
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} sm={12}>
// //               <TextField
// //                 required
// //                 id="productTitle"
// //                 name="productTitle"
// //                 label="Product Title"
// //                 fullWidth
// //                 defaultValue={currentUpdate.productTitle}
// //                 autoComplete="given-name"
// //                 variant="standard"
// //                 onChange={(e) => setProductTitle(e.target.value)}
// //               />
// //             </Grid>

// //             <Grid item xs={12} sm={12}>
// //               <Autocomplete
// //                 id="clear-on-escape"
// //                 options={categories}
// //                 clearOnEscape
// //                 renderInput={(params) => (
// //                   <TextField
// //                     {...params}
// //                     label={currentUpdate.categoryName}
// //                     defaultValue={currentUpdate.categoryName}
// //                     variant="standard"
// //                   />
// //                 )}
// //                 onChange={(event, newValue) => {
// //                   setCategory(newValue.code);
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 required
// //                 fullWidth
// //                 id="stock"
// //                 label="Item Qty"
// //                 defaultValue={currentUpdate.stock}
// //                 name="stock"
// //                 variant="standard"
// //                 onChange={(e) => setStock(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 required
// //                 fullWidth
// //                 id="price"
// //                 label="Unit Price"
// //                 defaultValue={currentUpdate.price}
// //                 name="price"
// //                 variant="standard"
// //                 onChange={(e) => setPrice(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 required
// //                 fullWidth
// //                 id="description"
// //                 label="Description"
// //                 multiline
// //                 rows={3}
// //                 maxRows={6}
// //                 variant="standard"
// //                 defaultValue={currentUpdate.description}
// //                 name="description"
// //                 autoComplete="family-name"
// //                 onChange={(e) => setDescription(e.target.value)}
// //               />
// //             </Grid>
// //           </Grid>
// //           <Box sx={{ width: "100%", display: updateProgress }}>
// //             <LinearProgress />
// //           </Box>
// //           <Grid item xs={12} sx={{ marginTop: "50px", marginBottom: "50px" }}>
// //             <Snackbar
// //               open={updateOpen}
// //               autoHideDuration={6000}
// //               onClose={handleClose}
// //             >
// //               <Alert
// //                 severity="success"
// //                 sx={{ width: "100%" }}
// //                 onClose={handleClose}
// //               >
// //                 Product Updated
// //               </Alert>
// //             </Snackbar>

// //             <Snackbar
// //               open={updateFailOpen}
// //               autoHideDuration={6000}
// //               onClose={handleClose}
// //             >
// //               <Alert
// //                 severity="error"
// //                 sx={{ width: "100%" }}
// //                 onClose={handleClose}
// //               >
// //                 Failed to update
// //               </Alert>
// //             </Snackbar>

// //             <Grid container spacing={2}>
// //               <Grid item xs={6}>
// //                 <Tooltip
// //                   title="Publish your product to customers"
// //                   placement="top-end"
// //                 >
// //                   <Button
// //                     variant="contained"
// //                     color="success"
// //                     sx={{ opacity: updateBtnOpacity, marginLeft: "40px" }}
// //                     onClick={() => update(currentUpdate)}
// //                   >
// //                     Update Product
// //                   </Button>
// //                 </Tooltip>
// //               </Grid>

// //               <Grid item xs={6}>
// //                 <Tooltip title="Delete product" placement="top-end">
// //                   <Button
// //                     variant="contained"
// //                     color="error"
// //                     onClick={()=>deleteProduct(currentUpdate._id)}
// //                     sx={{ opacity: updateBtnOpacity, marginLeft: "40px" }}
// //                   >
// //                     Delete Product
// //                   </Button>
// //                 </Tooltip>
// //               </Grid>
// //             </Grid>
// //           </Grid>
// //         </Box>
// //       </div>
// //     );
// //   } else {
//     return (
//       <React.Fragment>
//         <Title>Orders</Title>
//         {/* <Tooltip title="Add product to your store" placement="top-end">
//           <Button
//             variant="outlined"
//             startIcon={<AddBoxIcon />}
//             sx={{ width: "200px" }}
//             onClick={(e) => setAddProductState(true)}
//           >
//             Add Product
//           </Button>
//         </Tooltip> */}

//         <Grid container spacing={4} sx={{ marginTop: "10px" }}>
//           {orders.map((order) => (
//             <Grid item xs={12} md={4}>
//               <Card sx={{ maxWidth: 345, minHeight: 350 }}>
//                 <CardContent>
//                   <Typography
//                     variant="p"
//                     color="text.primary"
//                     sx={{ textAlign: "left", display: "flex" }}
//                   >
//                     {/* {product.productTitle.length <= 35
//                       ? product.productTitle
//                       : product.productTitle.substr(0, 35) + "..."} */}
//                   </Typography>
//                   <br></br>
//                   <Typography
//                     variant="p"
//                     color="text.secondary"
//                     sx={{ textAlign: "left", display: "flex" }}
//                   >
//                     Customer Name : {order.fname}
//                   </Typography>

//                   <Typography
//                     variant="p"
//                     color="text.secondary"
//                     sx={{ textAlign: "match-parent", display: "flex" }}
//                   >
//                     Location : {order.city}
//                   </Typography>
//                 </CardContent>

//                 {/* <CardActions disableSpacing>
//                   <Tooltip title="Update/Delete product" placement="top-end">
//                     <Button
//                       variant="outlined"
//                       startIcon={<EditIcon />}
//                       sx={{
//                         width: "100%",
//                         bottom: 0,
//                       }}
//                       onClick={(e) => editProduct(product)}
//                     >
//                       Update
//                     </Button>
//                   </Tooltip>
//                 </CardActions> */}
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </React.Fragment>
//     );
//   }
// // }

// import React from "react";
// import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiDrawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { mainListItems } from "../Seller_Components/listItems";

// import Chart from "../Seller_Components/Chart";
// import Deposits from "../Seller_Components/Deposits";
// import Products from "./Products";
// import { UserButton, useUser, useSignUp, useAuth } from "@clerk/clerk-react";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="#">
//         Herb-City
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   "& .MuiDrawer-paper": {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//     ...(!open && {
//       overflowX: "hidden",
//       transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       width: theme.spacing(7),
//       [theme.breakpoints.up("sm")]: {
//         width: theme.spacing(9),
//       },
//     }),
//   },
// }));

// const mdTheme = createTheme();
// const theme = createTheme();

// function Orders(props) {

//   const [orderDetails, setOrderDetails] = useState(null);

//   const { user } = useUser();
//   const { userId, actor } = useAuth();

//   const [shopId, setShopId] = React.useState(
//     JSON.parse(localStorage.getItem("shopInfo"))._id
//   );

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.post('http://localhost:6002/api/shop/getOrdersByShopId', {
//           shopId
//         });
//         setOrderDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching shop details:', error);
//       }
//     };

//     fetchOrderDetails();
//   }, []);
//   const { order } = props;

//   const [open, setOpen] = React.useState(true);
//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

 

//   return (
//     <ThemeProvider theme={mdTheme}>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="absolute" open={open}>
//           <Toolbar
//             sx={{
//               pr: "24px", // keep right padding when drawer closed
//             }}
//           >
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={toggleDrawer}
//               sx={{
//                 marginRight: "36px",
//                 ...(open && { display: "none" }),
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <UserButton />
//             {user ? <h3> Hello, {user.firstName}!</h3> : null}
//             {/* {actor && <span>user {actor.sub} has </span>} logged in as user
//             {userId} */}
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//               sx={{ flexGrow: 1 }}
//             >
//               Profile
//             </Typography>


            



//             <IconButton color="inherit">
//               <Badge badgeContent={4} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open}>
//           <Toolbar
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-end",
//               px: [1],
//             }}
//           >
//             <IconButton onClick={toggleDrawer}>
//               <ChevronLeftIcon />
//             </IconButton>
//           </Toolbar>
//           <Divider />
//           <List component="nav">
//             {mainListItems}
//             {/* <Divider sx={{ my: 1 }} />
//             {secondaryListItems} */}
//           </List>
//         </Drawer>

//         <Box
//           component="main"
//           sx={{
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light"
//                 ? theme.palette.grey[100]
//                 : theme.palette.grey[900],
//             flexGrow: 1,
//             height: "100vh",
//             overflow: "auto",
//           }}
//         >
//           <Toolbar />

//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//               {orderDetails ? (
//             <div style={{ width: '650px', backgroundColor: 'lightblue', padding: '20px', borderRadius: '8px' }}>
//               <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//               <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Shop Profile</h1>
//               <br/>
//                 <img src={orderDetails.pic} alt="Profile" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
//               </div>
//               <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Shop Name : {orderDetails.price}</h3>
//               <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Shop Description : {orderDetails.quantity}</h3>
//               <h3 style={{ textAlign: 'center' }}>Shop Location : {orderDetails.orderTotal}</h3>
//               {/* Render other shop details */}
//             </div>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default Orders;

import React, { useState, useEffect } from "react";
import axios from "axios";

function Orders() {
  const [orderDetails, setOrderDetails] = useState(null);
  const shopId = JSON.parse(localStorage.getItem("shopInfo"))._id;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post("http://localhost:6002/api/shop/getOrdersByShopId", {
          shopId,
        });
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [shopId]);

  return (
    <div>
      {orderDetails ? (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Product Picture</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Product Title</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Price</th>
              
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Quantity</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Customer Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Address</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Total</th>
              {/* Add more table headers for other order details */}
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((order) => (
              <tr key={order._id}>
                <td style={{ border: '1px solid #ccc', padding: '8px', verticalAlign: 'middle' }}>
                  <img src={order.pic} alt="Profile" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px', verticalAlign: 'middle' }}>{order.productTitle}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', verticalAlign: 'middle' }}>{order.price}.00</td>
                
                <td style={{ border: '1px solid #ccc', padding: '8px', verticalAlign: 'middle' }}>{order.quantity}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', verticalAlign: 'middle' }}>{order.checkoutDetails.fname} {order.checkoutDetails.lname}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', verticalAlign: 'middle' }}>{order.checkoutDetails.addressLine1}, {order.checkoutDetails.addressLine2}, {order.checkoutDetails.city}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', verticalAlign: 'middle' }}>{order.orderTotal}.00</td>
                {/* Add more table cells for other order details */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  
  
  
}

export default Orders;
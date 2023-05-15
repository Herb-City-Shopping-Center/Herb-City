import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Client_Components/Header";
import MainFeaturedPost from "../Client_Components/MainFeaturedPost";
import FeaturedPost from "../Client_Components/FeaturedPost";
import Footer from "../Client_Components/Footer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import axios from "axios";
import { useEffect } from "react";
import { UserButton, useUser, useSignUp, useAuth } from "@clerk/clerk-react";
import Swal from "sweetalert2";

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PendingActionsIcon />,
    2: <CheckIcon />,
    3: <LocalShippingIcon />,
    4: <CreditScoreIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};



const columns = [
  { id: "pic", label: "Image", minWidth: 170 },
  { id: "productTitle", label: "Product Title", minWidth: 100 },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "orderTotal",
    label: "Order Total",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "orderStatus",
    label: "Order Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const sections = [
  { title: "Home", url: "/" },
  { title: "Cart", url: "/cart" },
  { title: "Orders", url: "/orders" },
];

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

const theme = createTheme();
const UserServiceBaseUrl = process.env.REACT_APP_USER_SERVICE_BASE_URL;

const steps = ['Pending', 'Confirmed', 'Dispatched','Delivered'];

function CustomerOrders() {
  const { userId } = useAuth();

  const [page, setPage] = React.useState(0);
  const [deleteOrderId, setDeleteOrderId] = React.useState(null);
  const [viewOrderStatus, setViewOrderStatus] = React.useState(false);
  const [currentViewOrder, setCurrentViewOrder] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orders, setOrders] = React.useState([]);
  const [orderStatus, setOrderStatus] = React.useState(false);
  const [stepCount, setStepCount] = React.useState(0);



  const getOrdersByUserId = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        UserServiceBaseUrl + "/user/getOrdersByUserId",
        { userId },
        config
      );

      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  useEffect(() => {
    getOrdersByUserId();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewOrder = (order) => {
    setViewOrderStatus(true);
    setCurrentViewOrder(order);
    if (order.orderStatus === "Completed") {
      setOrderStatus(true);
    }
    if(order){
      if(order.orderStatus==="Pending"){
        setStepCount(0);
      }
      else if(order.orderStatus==="Confirmed"){
        setStepCount(1);
      }
      else if(order.orderStatus==="Dispatched"){
        setStepCount(2);
      }
      else if(order.orderStatus==="Delivered"){
        setStepCount(3);
      }
    }
    
    console.log(order.orderStatus);
    console.log(stepCount);
  };

  const closeOrder = () => {
    setViewOrderStatus(false);
    setCurrentViewOrder(null);
  };

  const deleteOrder = async (orderId) => {
    if (!orderId) {
      alert("No id");
    } else {
       console.log("----------------------------");
       console.log(orderId);
       console.log("----------------------------");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          UserServiceBaseUrl + "/user/deleteOrder",
          { orderId },
          config
        );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Order has been deleted",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        setDeleteOrderId(null);
        closeOrder();
        console.log(data);
        getOrdersByUserId();
      } catch (error) {
        setDeleteOrderId(null);
        console.log(error.response.data.error);
      }
    }
  };

  
  if (viewOrderStatus) {

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container>
          <Header title="Welcome to Herb-City" sections={sections} />

          <Box sx={{ maxWidth: "50%", marginTop: "50px", marginLeft: "200px" }}>
            <Tooltip title="Close" placement="top-end">
              <IconButton sx={{ marginLeft: "35vw" }} onClick={closeOrder}>
                <ClearIcon sx={{ display: "flex" }} />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>
            <Avatar
              src={currentViewOrder.pic ? currentViewOrder.pic : null}
              sx={{ width: "300px", height: "300px", marginLeft: "140px" }}
              variant="square"
            ></Avatar>

            <Stepper alternativeLabel activeStep={stepCount} connector={<ColorlibConnector />} sx={{mt:10}}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
              </Stepper>

            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                      {currentViewOrder.productTitle}
                    </Typography>
                    <List disablePadding>
                      <ListItem
                        key={currentViewOrder.price}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Unit Price"} />

                        <Typography variant="body2">
                          {currentViewOrder.price + ".00 lkr"}
                        </Typography>
                      </ListItem>

                      <ListItem
                        key={currentViewOrder.price}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Quantity"} />

                        <Typography variant="body2">
                          {currentViewOrder.quantity}
                        </Typography>
                      </ListItem>
                      <ListItem
                        key={currentViewOrder.price}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Order Status"} />
                        <Typography variant="body2">
                          {currentViewOrder.orderStatus}
                        </Typography>
                      </ListItem>
                      <ListItem
                        key={currentViewOrder.orderTotal}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Sub Total"} />

                        <Typography variant="body2">
                          {Number(currentViewOrder.orderTotal) +
                            Number(
                              currentViewOrder.checkoutDetails.deliverCost
                            )}
                          .00 lkr
                        </Typography>
                      </ListItem>
                      <ListItem
                        key={currentViewOrder.checkoutDetails.deliverMethod}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Delivery Method"} />

                        <Typography variant="body2">
                          {currentViewOrder.checkoutDetails.deliverMethod}
                        </Typography>
                      </ListItem>
                      <ListItem
                        key={currentViewOrder.checkoutDetails.deliverCost}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Delivery Cost"} />

                        <Typography variant="body2">
                          {currentViewOrder.checkoutDetails.deliverCost}.00 lkr
                        </Typography>
                      </ListItem>
                    </List>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                          Shipping
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.fname +
                            " " +
                            currentViewOrder.checkoutDetails.lname}
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.addressLine1}
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.addressLine2}
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.city}
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.state}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {orderStatus!=="Pending" ? (
                  <Typography
                    gutterBottom
                    onClick={() => deleteOrder(currentViewOrder._id)}
                  >
                    <a href="#">
                      <u>Delete Order</u>
                    </a>
                  </Typography>
                ) : (
                  <div></div>
                )}
              </React.Fragment>
            </Paper>
          </Box>
        </Container>

        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
    );
  } else if (!orders) {
    return <div>Loading...</div>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container>
          <Header title="Welcome to Herb-City" sections={sections} />

          <h4>My Purchases</h4>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={order.code}
                        onClick={() => viewOrder(order)}
                      >
                        {columns.map((column) => {
                          const value = order[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {isValidUrl(value) ? (
                                <Avatar
                                  variant="square"
                                  src={value}
                                  sx={{ width: "80px", height: "80px" }}
                                ></Avatar>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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

export default CustomerOrders;

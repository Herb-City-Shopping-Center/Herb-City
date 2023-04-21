import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { normalizeWithDefaultValue } from "@clerk/clerk-react/dist/utils";
import TextField from "@mui/material/TextField";

function Header(props) {
  const apiKey = "3165db4e8f07bee4f2d90aab6ae05729";
  const cityId = "1243936";
  const googleApiUrl =
    "https://api.openweathermap.org/data/2.5/weather?id=" +
    cityId +
    "&lang=en&units=metric&APPID=" +
    apiKey;

  var { weatherData, setWeatherData } = useState(null);

  const getWeatherData = async () => {
    try {
      const { data } = await axios.post(googleApiUrl);

      setWeatherData(data)
      console.log(weatherData);
    } catch (error) {
      console.log("Error fetching weather data");
    }
  };

  useEffect(() => {
    getWeatherData();
  });

  const { user } = useUser();
  const { sections, title } = props;

  const history = useHistory();

  const toGuide = () => {
    history.push("/sign-up");
  };

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {weatherData ? <h5>Temp : {weatherData.main.temp}</h5> : <h5>Loading...</h5>}

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, fontStyle: "bold" }}
        >
          {title}
        </Typography>

        {user ? (
          <UserButton />
        ) : (
          <Button variant="outlined" size="small" onClick={toGuide}>
            Signup/Signin
          </Button>
        )}
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{ backgroundColor: "#166300", marginBottom: "10px" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 2, flexShrink: 0, fontSize: 15, color: "white" }}
          >
            {section.title}
          </Link>
        ))}
        <TextField
          id="standard-search"
          label="Search product"
          type="search"
          variant="standard"
          sx={{ marginLeft: "40vw", marginTop: "-15px" }}
        />
        <IconButton>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;

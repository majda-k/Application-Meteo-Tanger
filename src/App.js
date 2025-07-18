import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardMeteo from "./cardMeteo";
import { Container } from "@mui/material";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar"; // Import Arabic locale for moment.js
import i18n from "./i18n"; // Import your i18n instance
import { fetchWeather } from "./weatherApiSlice";
import { useDispatch } from "react-redux";


const theme = createTheme({
  topography: {
    fontFamily: "IBM",
    fontSize: 14,
    fontWeight: 500,
  },
});

function App() {
const dispatch = useDispatch();
  const [dateAndTime, setDateAndTime] = useState("")
  const cancelAxiosRef = React.useRef(null);
  const [temp, setTemp] = useState({
    temp: null,
    min: null,
    max: null,
    description: null,
    icon: null,
  });


  useEffect(() => {
    console.log("Fetching weather data...");
    dispatch(fetchWeather());
    i18n.changeLanguage("ar");
    setDateAndTime(moment().locale("ar").format("MMMM Do YYYY, h:mm:ss a"));

      
    


      //  return {
      //     temp: temp,
      //     min: min,
      //     max: max,
      //     description: description,
      //     icon:`https://openweathermap.org/img/wn/${icon}@2x.png`,
      //     dateAndTime: dateAndTime,
      //   };


       })
    

  return (
    <React.StrictMode>
      <div className="App">
        <ThemeProvider theme={theme}>
          <div
            style={{
              backgroundColor: "#4169E1",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container maxWidth="sm">
              <CardMeteo temp={temp} />
            </Container>
          </div>
        </ThemeProvider>
      </div>
    </React.StrictMode>
  );
}

export default App;

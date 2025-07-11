import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardMeteo from "./cardMeteo";
import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar"; // Import Arabic locale for moment.js
import i18n from "./i18n"; // Import your i18n instance

const theme = createTheme({
  topography: {
    fontFamily: "IBM",
    fontSize: 14,
    fontWeight: 500,
  },
});

function App() {

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
    i18n.changeLanguage("ar");
    setDateAndTime(moment().locale("ar").format("MMMM Do YYYY, h:mm:ss a"));
    axios({
      cancelToken: new axios.CancelToken((c) => {
        cancelAxiosRef.current = c;
      }),
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather?lat=35.7696302&lon=-5.8033522&appid=e125df6838fd4205cab05e0d660fbd41&units=metric",
    })
      
    
    
    .then(function (response) {
        // handle success
        const temp = Math.round(response.data.main.temp);
        console.log(temp);

        const min = Math.round(response.data.main.temp_min);
        const max = Math.round(response.data.main.temp_max);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const dateAndTime = moment().locale("ar").format("MMMM Do YYYY, h:mm:ss a");
        console.log(response.data);

        setTemp({
          temp: temp,
          min: min,
          max: max,
          description: description,
          icon:`https://openweathermap.org/img/wn/${icon}@2x.png`,
          dateAndTime: dateAndTime,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      // cleanup function to cancel the request if the component unmounts
      console.log("Cleaning up...");

      cancelAxiosRef.current();
    };
  }, []);

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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

// Thunk Asynchrone
export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    console.log("Fetching weather data...");
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=35.7696302&lon=-5.8033522&appid=e125df6838fd4205cab05e0d660fbd41&units=metric"
    );

    const temp = Math.round(response.data.main.temp);
    const min = Math.round(response.data.main.temp_min);
    const max = Math.round(response.data.main.temp_max);
    const description = response.data.weather[0].description;
    const iconCode = response.data.weather[0].icon;
    const icon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const dateAndTime = moment().locale("ar").format("MMMM Do YYYY, h:mm:ss a");

    return { temp, min, max, description, icon, dateAndTime };
  }
);

// Slice Redux
const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeResult(state) {
      state.result = "changed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        console.log("Weather fetched successfully.");
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error fetching weather data:", action.error);
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;

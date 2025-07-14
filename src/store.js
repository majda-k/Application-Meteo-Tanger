import { configureStore } from "@reduxjs/toolkit";
import WeatherApiReducer from "./weatherApiSlice"; // Import the weatherApiSlice reducer


export const store = configureStore({
  reducer: {
    weather : WeatherApiReducer
  },
});


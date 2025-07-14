import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchWeather = createAsyncThunk(
  "myThunkFunction ",
  async () => {
     
   
     console.log("Fetching weather data...???????????????????");
    const result = await axios({
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather?lat=35.7696302&lon=-5.8033522&appid=e125df6838fd4205cab05e0d660fbd41&units=metric",
    })
  
      
    return () => {
      // cleanup function to cancel the request if the component unmounts
      console.log("Cleaning up...");

    };
  },
  []
);

const weatherApiSlice = createSlice({
  name: "weatherApi/fetchWeather",
  initialState: {
    result: "empty",
    weather :{},
    isLoading: "false",
  },
  reducers: {
    changeResult(state, action) {
      state.result = "changed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state , action) => {
        state.isLoading = true;
      }).addCase(fetchWeather.fulfilled, (state, action) => {
         state.isLoading = false;
      })
        .addCase(fetchWeather.rejected, (state, action) => {
            state.isLoading = false;
            console.error("Error fetching weather data:", action.error);
        });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;

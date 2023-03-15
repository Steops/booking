import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
  params: { name: "Paris", locale: "en-gb" },
  headers: {
    "X-RapidAPI-Key": "3b5ebfd8cdmsh502adc5be2a3a8dp17c0ffjsnd374b34227da",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  },
};

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (city: string | null, thunkAPI) => {
    const response = await axios.request({
      ...options,
      params: { name: city, locale: "en-gb" },
    });
    return response.data;
  }
);

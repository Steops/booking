import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://booking-com.p.rapidapi.com/v1/hotels/search",
  params: {
    adults_number: "1",
    dest_type: "city",
    filter_by_currency: "AED",
    checkout_date: "2023-09-06",
    checkin_date: "2023-09-05",
    order_by: "popularity",
    locale: "en-gb",
    dest_id: "-553173",
    units: "metric",
    room_number: "1",
  },
  headers: {
    "X-RapidAPI-Key": "21cc3dbfb1msh7f87941ff627560p124d7djsn2b2c493eac7f",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  },
};

const setCheckInDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const checkInDate = date.toLocaleDateString("en-ca");
  return checkInDate;
};

const setCheckOutDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  const checkOutDate = date.toLocaleDateString("en-ca");
  return checkOutDate;
};

export const fetchPopularHotels = createAsyncThunk(
  "hotels/fetchPopularHotels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.request({
        ...options,
        params: {
          adults_number: 2,
          dest_type: "city",
          filter_by_currency: "USD",
          checkout_date: setCheckOutDate(),
          checkin_date: setCheckInDate(),
          order_by: "popularity",
          locale: "en-gb",
          dest_id: "-1456928",
          units: "metric",
          room_number: 1,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

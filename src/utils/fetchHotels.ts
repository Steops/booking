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
    "X-RapidAPI-Key": "3b5ebfd8cdmsh502adc5be2a3a8dp17c0ffjsnd374b34227da",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  },
};

interface IFetchHotels {
  destId: string;
  checkinDate: Date | string;
  checkoutDate: Date | string;
  room: string;
  guests: string;
}

export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (
    { destId, checkinDate, checkoutDate, room, guests }: IFetchHotels,
    thunkAPI
  ) => {
    const response = await axios.request({
      ...options,
      params: {
        adults_number: guests,
        dest_type: "city",
        filter_by_currency: "USD",
        checkout_date: checkoutDate,
        checkin_date: checkinDate,
        order_by: "popularity",
        locale: "en-gb",
        dest_id: destId,
        units: "metric",
        room_number: room,
      },
    });
    console.log(response.data);
    return response.data;
  }
);

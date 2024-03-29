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

interface IFetchHotels {
  destId: string;
  checkinDate: Date | string;
  checkoutDate: Date | string;
  room: number;
  guests: number;
}

export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (
    { destId, checkinDate, checkoutDate, room, guests }: IFetchHotels,
    { rejectWithValue }
  ) => {
    try {
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
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

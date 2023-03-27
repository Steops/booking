import { IHotelData, IHotel } from "./../../types/types";
import { fetchHotels } from "../../utils/fetchHotels";
import { fetchCities } from "../../utils/fetchCities";
import { IRequestHotel } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  requestHotel: IRequestHotel;
  cities: any[];
  hotels: IHotelData | null;
  flag: {
    citiesFlag: boolean;
    hotelsFlag: string;
  };
  hotelResult: IHotel[] | null;
}

const initialState: IInitialState = {
  requestHotel: {
    city: "Paris",
    destId: "1",
    checkinDate: "",
    checkoutDate: "",
    room: "1",
    guests: "1",
  },
  cities: [{ dest_id: "1" }],
  hotels: null,
  hotelResult: null,
  flag: {
    citiesFlag: false,
    hotelsFlag: "",
  },
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.requestHotel.city = action.payload;
    },
    setId(state, action: PayloadAction<string>) {
      state.requestHotel.destId = action.payload;
    },
    setCheckInDate(state, action: PayloadAction<any>) {
      state.requestHotel.checkinDate = action.payload;
    },
    setCheckOutDate(state, action: PayloadAction<any>) {
      state.requestHotel.checkoutDate = action.payload;
    },
    setRoom(state, action: PayloadAction<string>) {
      state.requestHotel.room = action.payload;
    },
    setGuests(state, action: PayloadAction<string>) {
      state.requestHotel.guests = action.payload;
    },
    deleteHotels(state) {
      state.hotelResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.fulfilled, (state, action: PayloadAction<any>) => {
        state.flag.citiesFlag = true;
        state.cities = action.payload;
        state.requestHotel.destId = action.payload[0].dest_id;
      })
      .addCase(fetchCities.rejected, (state) => {
        console.log("Город не загрузился");
        state.flag.citiesFlag = false;
      })
      .addCase(fetchCities.pending, (state) => {
        state.flag.citiesFlag = false;
      })
      .addCase(
        fetchHotels.fulfilled,
        (state, action: PayloadAction<IHotelData>) => {
          state.flag.hotelsFlag = "fulfilled";
          console.log(action.payload);
          state.hotels = action.payload;
          state.hotelResult = state.hotels.result;
        }
      )
      .addCase(fetchHotels.pending, (state) => {
        state.flag.hotelsFlag = "pending";
      })
      .addCase(fetchHotels.rejected, (state) => {
        console.log("Отели не загрузились");
        state.flag.hotelsFlag = "rejected";
      });
  },
});

export default hotelSlice.reducer;

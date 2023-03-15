import { fetchHotels } from "../../utils/fetchHotels";
import { fetchCities } from "../../utils/fetchCities";
import { IRequestHotel } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  requestHotel: IRequestHotel;
  cities: any[];
  hotels: any[];
  flag: {
    citiesFlag: boolean;
    hotelsFlag: boolean;
  };
}

const initialState: IInitialState = {
  requestHotel: {
    city: "",
    destId: "1",
    checkinDate: "",
    checkoutDate: "",
    room: "1",
    guests: "1",
  },
  cities: [{ dest_id: "1" }],
  hotels: [],
  flag: {
    citiesFlag: false,
    hotelsFlag: false,
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
  },

  // нужен редюсер, который вызывает fetchHotels(requestHotel) ???

  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.fulfilled, (state, action: PayloadAction<any>) => {
        state.flag.citiesFlag = true;
        state.cities = action.payload;
        state.requestHotel.destId = state.cities[0].dest_id;
      })
      .addCase(fetchCities.rejected, (state) => {
        console.log("Город не загрузился");
        state.flag.citiesFlag = false;
      })
      .addCase(fetchCities.pending, (state) => {
        state.flag.citiesFlag = false;
      })
      .addCase(fetchHotels.fulfilled, (state, action: PayloadAction<any>) => {
        state.flag.hotelsFlag = true;
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.pending, (state) => {
        state.flag.hotelsFlag = false;
      })
      .addCase(fetchHotels.rejected, (state) => {
        console.log("Отели не загрузились");
        state.flag.hotelsFlag = false;
      });
  },
});

export default hotelSlice.reducer;

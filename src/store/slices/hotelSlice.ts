import { fetchPopularHotels } from "./../../utils/fetchPopularHotels";
import { IHotelData, IHotel, ICities } from "./../../types/types";
import { fetchHotels } from "../../utils/fetchHotels";
import { fetchCities } from "../../utils/fetchCities";
import { IRequestHotel } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  requestHotel: IRequestHotel;
  cities: ICities[];

  hotels: IHotelData | null;
  flag: {
    citiesFlag: boolean;
    hotelsFlag: string;
  };
  hotelResult: IHotel[] | null;

  popularHotels: IHotelData | null;
  popularHotelsResult: IHotel[] | null;
  popularFlag: {
    citiesFlag: boolean;
    hotelsFlag: string;
  };
}

const initialState: IInitialState = {
  requestHotel: {
    city: "Paris",
    destId: "1",
    checkinDate: "",
    checkoutDate: "",
    room: 1,
    guests: 1,
  },
  cities: [],
  hotels: null,
  hotelResult: null,
  flag: {
    citiesFlag: false,
    hotelsFlag: "",
  },
  popularHotels: null,
  popularHotelsResult: null,
  popularFlag: {
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
    setRoom(state, action: PayloadAction<number>) {
      state.requestHotel.room = action.payload;
    },
    setGuests(state, action: PayloadAction<number>) {
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
        state.flag.citiesFlag = false;
      })
      .addCase(fetchCities.pending, (state) => {
        state.flag.citiesFlag = false;
      })
      .addCase(
        fetchHotels.fulfilled,
        (state, action: PayloadAction<IHotelData>) => {
          state.flag.hotelsFlag = "fulfilled";
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
      })
      .addCase(
        fetchPopularHotels.fulfilled,
        (state, action: PayloadAction<IHotelData>) => {
          state.popularFlag.hotelsFlag = "fulfilled";
          state.popularHotels = action.payload;
          state.popularHotelsResult = state.popularHotels?.result;
        }
      )
      .addCase(fetchPopularHotels.pending, (state) => {
        state.popularFlag.hotelsFlag = "pending";
      })
      .addCase(fetchPopularHotels.rejected, (state) => {
        state.popularFlag.hotelsFlag = "rejected";
      });
  },
});

export default hotelSlice.reducer;

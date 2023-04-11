import { IHotelCard } from "./../../components/HotelCard/HotelCard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  email: string | null;
  token: string | null;
  id: string | null;
  currentUser: {
    firstName: string;
    secondName: string;
    favoritesHotels: IHotelCard[] | null;
  };
}
const initialState: IInitialState = {
  email: null,
  token: null,
  id: null,
  currentUser: {
    firstName: "",
    secondName: "",
    favoritesHotels: [],
  },
};

interface ISetUser {
  email: string | null;
  token: string | null;
  id: string | null;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<ISetUser>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
    setCurrentUser(state, action: PayloadAction<any>) {
      state.currentUser.firstName = action.payload.firstName;
      state.currentUser.secondName = action.payload.secondName;
      state.currentUser.favoritesHotels = action.payload.favoritesHotels;
    },

    setFavoriteHotel(state, action: PayloadAction<IHotelCard>) {
      if (state.currentUser.favoritesHotels) {
        const indexHotel = state.currentUser.favoritesHotels.findIndex(
          (e) => e.address === action.payload.address
        );
        if (indexHotel !== -1) {
          state.currentUser.favoritesHotels.splice(indexHotel, 1);
        } else {
          state.currentUser.favoritesHotels.push(action.payload);
        }
      }
    },
  },
});

export const { setUser, removeUser, setCurrentUser, setFavoriteHotel } =
  userSlice.actions;

export default userSlice.reducer;

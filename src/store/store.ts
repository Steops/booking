import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import hotelsReducer from "./slices/hotelsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    hotels: hotelsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

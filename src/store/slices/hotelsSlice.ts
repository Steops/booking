import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  result: any;
}

const initialState: IInitialState = {
  result: [],
};
export const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    getHotelsData(state, action: PayloadAction<any>) {
      console.log(action.payload, "action payload");
      state.result = action.payload;
    },
  },
});

export default hotelsSlice.reducer;

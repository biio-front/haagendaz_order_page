import { createSlice } from "@reduxjs/toolkit";

const checkOrderItemSlice = createSlice({
  name: "checkOrderItem",
  initialState: [],
  reducers: {
    addCheck: (state, { payload }) => {
      state.push(payload);
    },
    removeCheck: (state, { payload }) => {
      console.log(payload);
      return state.filter(id => id !== payload);
    },
    removeAllCheck: (state, { payload }) => {
      state = [payload];
    }
  },
});

export default checkOrderItemSlice.reducer;
export const { addCheck, removeCheck, removeAllCheck } = checkOrderItemSlice.actions;
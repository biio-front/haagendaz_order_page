import { createSlice } from "@reduxjs/toolkit";

const checkOrderItemSlice = createSlice({
  name: "checkOrderItem",
  initialState: [],
  reducers: {
    addCheck: (state, action) => {
      state.push(action.payload);
    },
    removeCheck: (state, action) => {
      console.log(action.payload);
      return state.filter(id => id !== action.payload);
    },
    removeAllCheck: (state, action) => {
      state = [action.payload];
    }
  },
});

export default checkOrderItemSlice.reducer;
export const { addCheck, removeCheck, removeAllCheck } = checkOrderItemSlice.actions;
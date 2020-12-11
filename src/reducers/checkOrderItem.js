import { createSlice } from "@reduxjs/toolkit";

const checkOrderItemSlice = createSlice({
  name: "checkOrderItem",
  initialState: [],
  reducers: {
    addCheck: (state, action) => {
      state.push(action.payload);
    },
    removeCheck: (state, action) =>
      state.filter(item => action.payload.indexOf(item.id) === -1)
    ,
    removeAllCheck: (state, action) => {
      state = [action.payload];
    }
  },
});

export default checkOrderItemSlice.reducer;
export const { addCheck, removeCheck, removeAllCheck } = checkOrderItemSlice.actions;
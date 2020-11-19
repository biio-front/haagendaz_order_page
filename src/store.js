import { configureStore, createSlice } from "@reduxjs/toolkit";

const item_inCart = createSlice({
  name: "cartReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ ...action.payload });
    },
    remove: (state, action) =>
      state.filter(item => action.payload.indexOf(item.id) === -1)
  },
});

const store = configureStore({ reducer: item_inCart.reducer });

export const { add, remove } = item_inCart.actions;

export default store;

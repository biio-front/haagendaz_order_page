import { configureStore, createSlice } from "@reduxjs/toolkit";

const item_inCart = createSlice({
  name: "cartReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const checkingSameItem = state.find(item => item.id === action.payload.id);
      if (checkingSameItem) {
        const indexOfSameItem = state.indexOf(checkingSameItem);
        state[indexOfSameItem] = action.payload;
      } else {
        state.push({ ...action.payload });
      }
    },
    remove: (state, action) =>
      state.filter(item => action.payload.indexOf(item.id) === -1),
    modify: (state, action) => {
      state[action.payload.index] = action.payload.item;
    }
  },
});

const store = configureStore({ reducer: item_inCart.reducer });

export const { add, remove, modify } = item_inCart.actions;

export default store;

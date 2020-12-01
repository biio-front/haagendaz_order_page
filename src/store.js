import { configureStore, createSlice } from "@reduxjs/toolkit";

const item_inCart = createSlice({
  name: "cartReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const checkingSameItem = state.find(item => item.id === action.payload.id);
      if (checkingSameItem) {
        const indexOfSameItem = state.indexOf(checkingSameItem);
        const _state = state;
        _state[indexOfSameItem] = action.payload;
        return _state;
      } else {
        const _state = state;
        _state.push({ ...action.payload });
        return _state;
      }
    },
    remove: (state, action) =>
      state.filter(item => action.payload.indexOf(item.id) === -1)
  },
});

const store = configureStore({ reducer: item_inCart.reducer });

export const { add, remove, modify } = item_inCart.actions;

export default store;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const checkingSameItem = state.find(item => item.id === action.payload.id);
      if (checkingSameItem) {
        // 장바구니에 선택한 상품과 동일한 상품이 있을 경우, 동일한 상품의 정보만 변경.
        const indexOfSameItem = state.indexOf(checkingSameItem);
        state[indexOfSameItem] = action.payload;
      } else {
        // 선택한 상품과 같은 상품이 없을 경우, data 추가.
        state.push(action.payload);
      }
    },
    remove: (state, action) =>
      state.filter(item => action.payload.indexOf(item.id) === -1),
    reset: (state, action) => {
      state = [action.payload];
    }
  },
});

export default cartSlice.reducer;
export const { add, remove, reset } = cartSlice.actions;
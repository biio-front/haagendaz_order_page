import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, { payload }) => {
      // state = payload;
      const checkingSameItem = state.find(item => item.id === payload.id);
      if (checkingSameItem) {
        // 장바구니에 선택한 상품과 동일한 상품이 있을 경우, 동일한 상품의 정보만 변경.
        const indexOfSameItem = state.indexOf(checkingSameItem);
        state[indexOfSameItem] = payload;
      } else {
        // 선택한 상품과 같은 상품이 없을 경우, data 추가.
        state.push(payload);
      }
    },
    remove: (state, { payload }) =>
      state.filter(item => payload.indexOf(item.id) === -1),
    reset: (state) => {
      state = [];
    }
  },
});

export default cartSlice.reducer;
export const { add, remove, reset } = cartSlice.actions;
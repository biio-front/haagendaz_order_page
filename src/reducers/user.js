import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    login: (state, { payload }) =>
      state.filter(item => payload.indexOf(item.id) === -1),
    logout: (state) => {
      state = [];
    }
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
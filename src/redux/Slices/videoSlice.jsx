import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
  },
});

const actions = videoSlice.actions;

export const { loginStart, loginSuccess, loginFailure, logout } = actions;

export default videoSlice.reducer;

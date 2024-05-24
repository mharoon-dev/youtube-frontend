import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  loading: false,
  error: "",
};

const videouploadingSlice = createSlice({
  name: "videoUploading",
  initialState,
  reducers: {
    uploadingStart: (state) => {
      state.loading = true;
    },
    uploadingSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    uploadingFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

const actions = videouploadingSlice.actions;

export const { uploadingStart, uploadingSuccess, uploadingFailure } = actions;

export default videouploadingSlice.reducer;

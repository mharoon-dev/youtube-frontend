import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/userSlice";
import videoReducer from "./Slices/videoSlice";
import videouploadingReducer from "./Slices/videouploadingSlice";

const store = configureStore(
  {
    reducer: {
      user: userReducer,
      video: videoReducer,
      videoUploading: videouploadingReducer,
    },
  },
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

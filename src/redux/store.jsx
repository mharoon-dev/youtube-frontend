import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/userSlice";
import videoReducer from "./Slices/videoSlice";

const store = configureStore(
  {
    reducer: {
      user: userReducer,
      videoReducer,
    },
  },
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

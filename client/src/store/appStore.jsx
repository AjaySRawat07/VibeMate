import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import feedReducer from "../store/feedStore";

const Store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default Store;

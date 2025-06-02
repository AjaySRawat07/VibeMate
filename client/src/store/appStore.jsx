import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import feedReducer from "../store/feedStore";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestConnection";

const Store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export default Store;

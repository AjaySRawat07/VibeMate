import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => [],
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;

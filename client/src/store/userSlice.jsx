import { createSlice } from "@reduxjs/toolkit";

const initialState = (() => {
  try {
    const item = localStorage.getItem("user");

    if (!item || item === "undefined" || item === "null") {
      return null;
    }

    return JSON.parse(item);
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return null;
  }
})();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser: (state, action) => {
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

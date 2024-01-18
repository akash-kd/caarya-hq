import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

// Open toggle for Mobile Side Navigation
export const navigation = createSlice({
  name: "sideNav",
  initialState,
  reducers: {
    change: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { change } = navigation.actions;

export default navigation.reducer;

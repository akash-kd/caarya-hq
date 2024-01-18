import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  fetching: true,
};

// Storing members
export const sourcingDrive = createSlice({
  name: "sourcingDrive",
  initialState,
  reducers: {
    updateList: (state, action) => {
      state.list = action.payload.list;
      state.fetching = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateList } = sourcingDrive.actions;

export default sourcingDrive.reducer;

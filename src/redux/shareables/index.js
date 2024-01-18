import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  learnings: { knowledge: [], fyi: [], kits: [] },
};

// Storing shareables
export const shareable = createSlice({
  name: "shareable",
  initialState,
  reducers: {
    updateLearning: (state, action) => {
      let type = action.payload.type;
      state.learnings[type] = action.payload.list;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLearning } = shareable.actions;

export default shareable.reducer;

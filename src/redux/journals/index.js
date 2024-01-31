import * as JournalAPI from "../../config/APIs/journals";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  journals: [],
  onGoing: [],
};

// Storing journals
export const journals = createSlice({
  name: "journals",
  initialState,
  reducers: {
    updateJournals: (state, action) => {
      state.journals = action.payload.journals;
    },
    updateOngoingJournals: (state, action) => {
      state.onGoing = action.payload.onGoing;
    },
  },
});

export const { updateJournals, updateOngoingJournals } = journals.actions;

export default journals.reducer;

export const fetchAllJournals = () => {
  return async (dispatch) => {
    try {
      const response = await JournalAPI.findAllJournals();
      if (response.status === 200) {
        let data = response.data?.data?.response;
        // Dispatching journals data to redux-store
        dispatch(
          updateJournals({
            journals: data,
          })
        );
      }
    } catch (err) {
      console.log("Journals fetching error", err);
    }
  };
};

export const fetchOngoingJournals = () => {
  return async (dispatch) => {
    try {
      const response = await JournalAPI.getOnGoingJournal();
      if (response.status === 200) {
        let data = response.data;
        // Dispatching ongoing journal data to redux-store
        dispatch(
          updateOngoingJournals({
            onGoing: data,
          })
        );
      }
    } catch (err) {
      console.log("Ongoing journals fetching error", err);
    }
  };
};

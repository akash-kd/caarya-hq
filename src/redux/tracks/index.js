import { createSlice } from "@reduxjs/toolkit";
import { findMyTracks } from "config/APIs/tracks";
import {
  TRACK_CATEGORY_ACADEMICS,
  TRACK_CATEGORY_CAARYA,
  TRACK_CATEGORY_HEALTH,
  TRACK_CATEGORY_PERSONAL,
  defaultTracks,
} from "helpers/constants/tracks";

const initialState = {
  lits: [],
  fetching: true,
  [TRACK_CATEGORY_CAARYA]: { list: [] },
  [TRACK_CATEGORY_ACADEMICS]: { list: [] },
  [TRACK_CATEGORY_PERSONAL]: { list: [] },
  [TRACK_CATEGORY_HEALTH]: { list: [] },
};

// Storing User's tracks
export const tracks = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    updateList: (state, action) => {
      let list = action.payload.list;

      let temp = [];

      defaultTracks?.map((item) => {
        if (list?.find((a) => a?.title == item?.title)) {
          let t = list?.filter((a) => a?.title == item?.title);
          temp = temp.concat(t);
          list = list?.filter((a) => a?.title !== item?.title);
        }
      });

      temp = temp.concat(list);

      state[TRACK_CATEGORY_CAARYA].list = temp?.filter(
        (t) => t?.category == TRACK_CATEGORY_CAARYA
      );
      state[TRACK_CATEGORY_ACADEMICS].list = temp?.filter(
        (t) => t?.category == TRACK_CATEGORY_ACADEMICS
      );
      state[TRACK_CATEGORY_PERSONAL].list = temp?.filter(
        (t) => t?.category == TRACK_CATEGORY_PERSONAL
      );
      state[TRACK_CATEGORY_HEALTH].list = temp?.filter(
        (t) => t?.category == TRACK_CATEGORY_HEALTH
      );
      state.list = temp;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateList } = tracks.actions;

export default tracks.reducer;

export function fetchAllTracks() {
  return async (dispatch) => {
    try {
      const response = await findMyTracks();

      if (response.status === 200) {
        let data = response.data.data;

        dispatch(updateList({ list: data }));
      }
    } catch (err) {
      console.log("task fetching error", err);
    }
  };
}

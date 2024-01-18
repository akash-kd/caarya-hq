import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "config/APIs/notification";
import { TYPE_GOAL_BASED } from "helpers/constants/notification";

const initialState = {
  list: [],
  fetching: true,
};

// Storing User's goals
export const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateList: (state, action) => {
      let list = action.payload.list;
      state.list = list;
      state.fetching = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateList } = notification.actions;

export default notification.reducer;

export function fetchAllNotifications() {
  return async (dispatch) => {
    try {
      let q = { type: TYPE_GOAL_BASED };

      const response = await getNotifications(q);

      if (response.status === 200) {
        let data = response.data.data?.response;

        dispatch(updateList({ list: data }));
      }
    } catch (err) {
      console.log("task fetching error", err);
    }
  };
}

import * as CgcAPI from "config/APIs/cgc";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  typeWiseList: {
    Live: [],
    Pipeline: [],
  },
  cgc: [],
};

// Storing colleges
export const college = createSlice({
  name: "college",
  initialState,
  reducers: {
    updateList: (state, action) => {
      state.list = action.payload.list;
    },
    updateTypeWise: (state, action) => {
      let list = action.payload.list;

      let types = ["Live", "Pipeline"];

      let temp = { Live: [], Pipeline: [] };

      list?.map((i) => {
        if (types?.includes(i?.type)) {
          temp[i.type].push(i);
        } else {
          types.push(i?.type);
          temp[i.type] = [i];
        }
      });
      state.typeWiseList = temp;
    },
    updateCGCList: (state, action) => {
      state.cgc = action.payload.list;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateList, updateTypeWise, updateCGCList } = college.actions;

export default college.reducer;

export function fetchAllCGCs() {
  return async (dispatch) => {
    try {
      const response = await CgcAPI.findAll();
      if (response.status === 200) {
        let data = response.data?.data?.response;

        // Dispatching designation data to redux-store
        dispatch(
          updateCGCList({
            list: data,
          })
        );
      }
    } catch (err) {
      console.log("Designation fetching error", err);
    }
  };
}

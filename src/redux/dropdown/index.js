import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "config/APIs/chronicles";
import { findAll } from "config/APIs/college";
import { getAllEventCategory, getAllEventTypes } from "config/APIs/events";
import { getAllUsers } from "config/APIs/users";

const initialState = {
  eventType: { fetching: true, list: [] },
  users: { fetching: true, list: [] },
  colleges: { fetching: true, list: [] },
  products: { fetching: true, list: [] },
  eventCategory: { fetching: true, list: [] },
};

export const dropdown = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    updateReduxDropdownList: (state, action) => {
      let field = action.payload.field;
      state[field]["list"] = action.payload.list;
      state[field]["fetching"] = false;
    },
  },
});

export const { updateReduxDropdownList } = dropdown.actions;
export default dropdown.reducer;

export function fetchAllUsers() {
  return async (dispatch) => {
    try {
      const response = await getAllUsers({ is_active: true });

      if (response.status === 200) {
        let data = response.data.data;

        // Dispatching user data to redux-store
        dispatch(
          updateReduxDropdownList({
            field: "users",
            list: data,
          })
        );
      }
    } catch (err) {
      console.log("user fetching error", err);
    }
  };
}
export function fetchEventType() {
  return async (dispatch) => {
    try {
      const response = await getAllEventTypes();
      if (response.status === 200) {
        let data = response.data?.data;

        // Dispatching designation data to redux-store
        dispatch(
          updateReduxDropdownList({
            list: data,
            field: "eventType",
          })
        );
      }
    } catch (err) {
      console.log("Designation fetching error", err);
    }
    try {
      const response = await getAllEventCategory();
      if (response.status === 200) {
        let data = response.data?.data;

        // Dispatching designation data to redux-store
        dispatch(
          updateReduxDropdownList({
            list: data,
            field: "eventCategory",
          })
        );
      }
    } catch (err) {
      console.log("Designation fetching error", err);
    }
  };
}

export function fetchAllColleges() {
  return async (dispatch) => {
    try {
      const response = await findAll();
      if (response.status === 200) {
        let data = response.data?.data?.response;

        // Dispatching designation data to redux-store
        dispatch(
          updateReduxDropdownList({
            list: data,
            field: "colleges",
          })
        );
      }
    } catch (err) {
      console.log("Designation fetching error", err);
    }
  };
}

export function fetchAllProducts() {
  return async (dispatch) => {
    try {
      const response = await getAllProducts();
      if (response.status === 200) {
        let data = response.data?.data;

        // Dispatching designation data to redux-store
        dispatch(
          updateReduxDropdownList({
            list: data,
            field: "products",
          })
        );
      }
    } catch (err) {
      console.log("Products fetching error", err);
    }
  };
}

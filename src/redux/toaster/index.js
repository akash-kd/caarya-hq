import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  message: "",
  type: "",
};

// Showing the Toaster Popup
export const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    showToast: (state, action) => {
      console.log(action.payload);
      let msg = action.payload.message || "Something went wrong!";
      let type = action.payload?.type;
      if (type == "error") {
        toast.error(msg);
      } else {
        toast.success(msg);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { showToast } = toasterSlice.actions;

export default toasterSlice.reducer;

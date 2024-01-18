import { configureStore } from "@reduxjs/toolkit";

import navigationReducer from "./navigation";
import toasterReducer from "./toaster";
import userReducer from "./user";
import projectReducer from "./projects";
import goalsReducer from "./goal";

const store = configureStore({
  reducer: {
    sideNav: navigationReducer,
    toaster: toasterReducer,
    user: userReducer,
    projects: projectReducer,
    goals: goalsReducer,
  },
});

export default store;

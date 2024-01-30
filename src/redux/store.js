import { configureStore } from "@reduxjs/toolkit";

import navigationReducer from "./navigation";
import toasterReducer from "./toaster";
import userReducer from "./user";
import projectReducer from "./projects";
import goalsReducer from "./goal";
import shareablesReducer from "./shareables";
import sourcingDriveReducer from "./sourcingDrive";
import collegeReducer from "./college";
import tracksReducer from "./tracks";
import dropdown from "./dropdown";
import journalReducer from "./journals";
const store = configureStore({
  reducer: {
    sideNav: navigationReducer,
    toaster: toasterReducer,
    user: userReducer,
    projects: projectReducer,
    shareables: shareablesReducer,
    sourcingDrive: sourcingDriveReducer,
    college: collegeReducer,
    dropdown: dropdown,
    tracks: tracksReducer,
    goals: goalsReducer,
    journals: journalReducer,
  },
});

export default store;

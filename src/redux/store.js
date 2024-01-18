import { configureStore } from "@reduxjs/toolkit";

import navigationReducer from "./navigation";
import toasterReducer from "./toaster";
import userReducer from "./user";
import tasksReducer from "./task";
import goalsReducer from "./goal";
import notificationReducer from "./notification";
import trackReducer from "./tracks";

const store = configureStore({
  reducer: {
    sideNav: navigationReducer,
    toaster: toasterReducer,
    user: userReducer,
    tasks: tasksReducer,
    goals: goalsReducer,
    notification: notificationReducer,
    tracks: trackReducer,
  },
});

export default store;

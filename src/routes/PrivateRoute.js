import React from "react";
import { Redirect } from "react-router-dom";

import { checkAppAccess } from "helpers/utils/accessCheck";
import Clock from "pages/ClockIn";
import Journal from "pages/Journal";
import FocusArea from "pages/FocusArea";
import ProjectsPage from "pages/Project";
// Authenticated Paths

// Array of routes only a logged in user can access
const privateRoutes = [
  {
    name: "Clock In",
    description: "",
    tab: "Clock In",
    path: "/clockIn",
    component: Clock,
  },

  {
    name: "Focus Area",
    description: "",
    tab: "Focus Area",
    path: "/focusZone",
    component: FocusArea,
  },
  {
    name: "Battle Section",
    description: "",
    tab: "Battle Section",
    path: "/battle",
    component: ProjectsPage,
  },
  {
    name: "Journal",
    description: "",
    tab: "Journal",
    path: "/journal",
    component: Journal,
  },

  {
    path: "/",
    exact: true,
    component: () =>
      localStorage.getItem("token") ? (
        checkAppAccess() ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/accessDenied" />
        )
      ) : (
        <Redirect to="/auth/signIn" />
      ),
  },
];

export { privateRoutes };

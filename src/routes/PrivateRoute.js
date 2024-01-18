import React from "react";
import { Redirect } from "react-router-dom";

import SquadUser from "pages/MySquad/SquadUser";
import Tasks from "pages/Tasks/IndividualPage";
import Project from "pages/Project/IndividualProject";

import MySquadPage from "pages/MySquad";
import Projects from "pages/Project";
import AllTasks from "pages/Tasks";
import Learning from "pages/Learning";
import Dashboard from "pages/Dashboard";
import {
  DISCORD,
  LEARNING,
  DASHBOARD,
  MYSQUAD,
  PROJECTS,
  TASKS,
  CLOCK_IN,
} from "helpers/constants/tabs";
import { DiscordPage } from "pages/Discord";
import { checkAppAccess } from "helpers/utils/accessCheck";
import Clock from "pages/ClockIn";
import IndividualTrack from "pages/Tracks/IndividualTrack";
import GoalHub from "pages/GoalHub";
import Journal from "pages/Journal";
import Tracks from "pages/Tracks";
import FocusArea from "pages/FocusArea";
// Authenticated Paths

// Array of routes only a logged in user can access
const privateRoutes = [
  {
    name: TASKS,
    description:
      "View tasks you own, tasks you are collaborating on and tasks that you have created. Also view and edit tasks that you want to focus on and knock off today and this week.",
    tab: TASKS,
    path: "/tasks/:id",
    component: Tasks,
  },
  {
    name: CLOCK_IN,
    description: "",
    tab: CLOCK_IN,
    path: "/clockIn",
    component: Clock,
  },
  {
    name: TASKS,
    description:
      "View tasks you own, tasks you are collaborating on and tasks that you have created. Also view and edit tasks that you want to focus on and knock off today and this week.",
    tab: TASKS,
    path: "/tasks",
    component: AllTasks,
  },
  {
    name: MYSQUAD,
    description:
      "View tasks you own, tasks you are collaborating on and tasks that you have created. Also view and edit tasks that you want to focus on and knock off today and this week.",
    tab: MYSQUAD,
    path: "/mySquad",
    component: MySquadPage,
  },
  {
    name: PROJECTS,
    description: "This section shows the projects you are currently a part of",
    tab: PROJECTS,
    path: "/projects",
    component: Projects,
  },
  {
    name: LEARNING,
    description: "",
    tab: LEARNING,
    path: "/learning",
    component: Learning,
  },
  {
    name: "Track",
    description: "",
    tab: "Track",
    path: "/tracks/:id",
    component: IndividualTrack,
  },
  {
    name: "Track",
    description: "",
    tab: "Track",
    path: "/tracks",
    component: Tracks,
  },

  {
    name: "Goal Hub",
    description: "",
    tab: "Goal Hub",
    path: "/goalHub",
    component: GoalHub,
  },
  {
    name: "Focus Area",
    description: "",
    tab: "Focus Area",
    path: "/focusZone",
    component: FocusArea,
  },
  {
    name: "Journal",
    description: "",
    tab: "Journal",
    path: "/journal",
    component: Journal,
  },
  {
    name: DASHBOARD,
    description: "",
    tab: DASHBOARD,
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: MYSQUAD,
    description: "",
    tab: MYSQUAD,
    path: "/squadUser/:id",
    component: SquadUser,
  },
  {
    name: PROJECTS,
    description: "This section shows the projects you are currently a part of",
    tab: PROJECTS,
    path: "/project/:id",
    component: Project,
  },
  {
    name: DISCORD,
    description: "",
    tab: DISCORD,
    path: "/discord",
    component: DiscordPage,
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

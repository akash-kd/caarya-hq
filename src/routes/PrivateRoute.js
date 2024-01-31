import React from "react";
import { Redirect } from "react-router-dom";

import { checkAppAccess } from "helpers/utils/accessCheck";
import Clock from "pages/ClockIn";
import Journal from "pages/Journal";
import FocusArea from "pages/FocusArea";
import ProjectsPage from "pages/Project";
import Shareables from "pages/Shareables";
import Chronicles from "pages/Chronicles";
<<<<<<< HEAD
import Chronicle from "pages/Chronicle";
=======
>>>>>>> origin/master
import Today from "pages/Today";
import AcrossTheVerse from "pages/Verse";
import Events from "pages/Events";
import FocusGoals from "pages/FocusArea/FocusGoals";
import Learning from "pages/Learning";
import Essentials from "pages/FoundationEssentials/Essentials";
import TribeVibe from "pages/TribeVibe";
import Sprint from "pages/SprintCard";
<<<<<<< HEAD
import AddChronicles from "pages/Chronicle/addChronicles";
=======
import AddChronicles from "pages/Chronicles/AddChron";
>>>>>>> origin/master
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
    name: "Shareables",
    description: "",
    tab: "Shareables",
    path: "/shareables",
    component: Shareables,
  },
  {
    name: "Today",
    description: "",
    tab: "Today",
    path: "/today",
    component: Today,
  },
  {
    name: "Chronicles",
    description: "",
    tab: "Chronicles",
    path: "/chronicles",
    component: Chronicles,
  },
  {
    name: "Battle Section",
    description: "",
    tab: "Battle Section",
    path: "/battle",
    component: ProjectsPage,
  },
  {
    name: "Events",
    description: "",
    tab: "Events",
    path: "/events",
    component: Events,
  },
  {
    name: "Sprint",
    description: "",
    tab: "Sprint",
    path: "/sprint",
    component: Sprint,
  },
  {
    name: "Tribe Vibe",
    description: "",
    tab: "Tribe Vibe",
    path: "/tribe",
    component: TribeVibe,
  },
  {
    name: "Learning",
    description: "",
    tab: "Learning",
    path: "/learning",
    component: Learning,
  },
  {
    name: "Essentials",
    description: "",
    tab: "Essentials",
    path: "/essentials/:type",
    component: Essentials,
  },

  {
    name: "Focus Goals",
    description: "",
    tab: "Focus Goals",
    path: "/focusGoals",
    component: FocusGoals,
  },
  {
    name: "Journal",
    description: "",
    tab: "Journal",
    path: "/journal",
    component: Journal,
  },
  {
    name: "Verse",
    description: "",
    tab: "Verse",
    path: "/verse",
    component: AcrossTheVerse,
  },
  {
    name: "Add Chronicle",
    description: "",
    tab: "Add Chron",
    path: "/chronicle/add",
    component: AddChronicles,
  },
  {
    name: "Chronicle",
    description: "",
    tab: "Chronicle",
    path: "/chronicle",
    component: Chronicle,
  },

  {
    path: "/",
    exact: true,
    component: () =>
      localStorage.getItem("token") ? (
        checkAppAccess() ? (
          <Redirect to="/today" />
        ) : (
          <Redirect to="/accessDenied" />
        )
      ) : (
        <Redirect to="/auth/signIn" />
      ),
  },
];

export { privateRoutes };

import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

import { Toaster } from "react-hot-toast";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateUserClock, updateUserSquad } from "redux/user";

// Routes
import { publicRoutes } from "routes/PublicRoute";
import { privateRoutes } from "routes/PrivateRoute";

// Components
import NonAuthMiddleware from "routes/NonAuthMiddleware";
import AuthenticatedRedirects from "routes/AuthenticatedRedirects";

// APIs
import { refreshToken } from "config/APIs";
import * as SquadAPIs from "config/APIs/squad";
import {
  ProjectTypes,
  PROJECT_TYPE_CAARYA_INTERNAL,
  PROJECT_TYPE_INITIATIVES,
  PROJECT_TYPE_PERSONAL,
  PROJECT_TYPE_WORK_STUDY,
  PROJECT_TYPE_DEPARTMENTAL_DESKS,
} from "helpers/projects";
import { fetchAllTasks } from "redux/task";
import { fetchAllgoals } from "redux/goal";
import { fetchAllNotifications } from "redux/notification";
import { fetchAllTracks } from "redux/tracks";
import LaptopState from "layout/LaptopState";

function App() {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await refreshToken();
      if (response.status === 200) {
        const { token, admin } = response.data.data;
        localStorage.setItem("admin", JSON.stringify(admin));
        localStorage.setItem("role", "admin");
        localStorage.setItem("token", token);
      }
    } catch (err) {
      console.log("actions/auth/refreshToken error", err);
      let response = err?.response;

      switch (response?.status) {
        case "401":
          // Logout
          console.log("Refresh token!!", response);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          break;
        case "403":
          window.location.replace("/accessDenied");
        default:
          // Logout
          console.log("Refresh token!!", response);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
      }
    }
  };

  const fetchSquad = async () => {
    try {
      let res = await SquadAPIs.getUserSquad(null, { showStats: true });

      if (res.data && res.data.data) {
        let data = res.data.data;
        let members = { teamMembers: [], mentors: [], mentees: [] };
        let projects = {};
        projects[PROJECT_TYPE_WORK_STUDY] = [];
        projects[PROJECT_TYPE_CAARYA_INTERNAL] = [];
        projects[PROJECT_TYPE_INITIATIVES] = [];
        projects[PROJECT_TYPE_PERSONAL] = [];
        projects[PROJECT_TYPE_DEPARTMENTAL_DESKS] = [];

        data?.projects?.map((item) => {
          if (Object.keys(projects).includes(item?.type)) {
            projects[item?.type].push(item);
          } else {
            if (ProjectTypes.find((e) => e?.value == item?.type))
              projects[item?.type] = [item];
          }
        });

        members.teamMembers = data?.teamMembers;
        members.mentees = data?.mentees ? data?.mentees : [];
        members.mentors = data?.mentor ? [data?.mentor] : [];
        dispatch(updateUserSquad({ squad: members, projects: projects }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted && !location?.pathname?.includes("/redirect")) {
      refresh();
      fetchSquad();

      dispatch(fetchAllgoals());
      dispatch(fetchAllTasks());
      dispatch(fetchAllNotifications());
      dispatch(fetchAllTracks());
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <React.Fragment>
      <Toaster
        toastOptions={{
          className: "font-lato text-base rounded",
          success: {
            style: {
              background: "#fff",
              color: "#301709",
              padding: "6px 20px",
            },
          },
          error: {
            style: {
              background: "#fff",
              color: "#301709",
              padding: "6px 20px",
            },
          },
        }}
        position="top-right"
      />
      <LaptopState />
      <div className="min-h-screen block md:hidden max-h-screen bg-white lg:bg-primary-gray-50">
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <NonAuthMiddleware
                path={route.path}
                component={route.component}
                key={idx}
              />
            ))}
            {privateRoutes.map((route, idx) => (
              <AuthenticatedRedirects
                path={route.path}
                component={route.component}
                key={idx}
              />
            ))}
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;

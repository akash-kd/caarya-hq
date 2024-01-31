import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

import { Toaster } from "react-hot-toast";

// Redux
import { useDispatch } from "react-redux";

// Routes
import { publicRoutes } from "routes/PublicRoute";
import { privateRoutes } from "routes/PrivateRoute";

// Components
import NonAuthMiddleware from "routes/NonAuthMiddleware";
import AuthenticatedRedirects from "routes/AuthenticatedRedirects";

// APIs
import { fetchAllgoals } from "redux/goal";
import LaptopState from "layout/LaptopState";
import { fetchAllProjects } from "redux/projects";
import { fetchAllUsers } from "redux/dropdown";
import { refreshToken } from "config/APIs/auth";

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

  useEffect(() => {
    let isMounted = true;

    if (isMounted && !location?.pathname?.includes("/redirect")) {
      refresh();
      dispatch(fetchAllProjects());

      dispatch(fetchAllgoals());
      dispatch(fetchAllUsers());
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
      <div className="min-h-screen bg-white block md:hidden max-h-screen ">
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

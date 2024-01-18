import { Redirect } from "react-router-dom";
import SignIn from "pages/AuthPages/SignIn";
import RedirectPage from "pages/AuthPages/Redirect";
import { checkAppAccess } from "helpers/utils/accessCheck";
import Unauthorized from "layout/Unauthorized";

// Public Routes
// Routes for Authenticating Users
const publicRoutes = [
  // Authentication
  {
    path: "/auth/signIn",
    component: () =>
      localStorage.getItem("token") ? (
        checkAppAccess() ? (
          <Redirect to="/today" />
        ) : (
          <Redirect to="/accessDenied" />
        )
      ) : (
        <SignIn />
      ),
  },
  {
    path: "/accessDenied",
    component: Unauthorized,
  },
  {
    path: "/redirect",
    component: RedirectPage,
  },
];

export { publicRoutes };

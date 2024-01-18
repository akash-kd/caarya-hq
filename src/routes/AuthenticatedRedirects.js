import { checkAppAccess } from "helpers/utils/accessCheck";
import AppWrapper from "layout/AppWrapper";
import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

// Wrapper for Private Routes
const AuthenticatedRedirects = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("token")) {
          return (
            <Redirect
              to={{
                pathname: "/auth/signIn",
                state: { from: props.location },
              }}
            />
          );
        }
        if (!checkAppAccess()) {
          return <Redirect to="/accessDenied" />;
        }

        return (
          <AppWrapper>
            <Component {...props} />
          </AppWrapper>
        );
      }}
    />
  );
};

export default withRouter(AuthenticatedRedirects);

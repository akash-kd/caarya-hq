import { Route } from "react-router-dom";

// Wrapper for Public Routes
function NonAuthMiddleware({ component: Component }) {
  return (
    <Route
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}

export default NonAuthMiddleware;

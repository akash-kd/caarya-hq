/* eslint-disable no-undef */
const config = {
  environment: process.env.REACT_APP_ENV || "production",
  endpoints: {
    prod: "https://chronos-prod-tk4gwh76qa-el.a.run.app",
    dev: "https://chronos-dev-tk4gwh76qa-el.a.run.app",
    local: "http://localhost:4193",
  },

  getEndpoint() {
    switch (this.environment) {
      case "local":
        return this.endpoints.local;
      case "development":
        return this.endpoints.dev;
      case "production":
        return this.endpoints.prod;
      default:
        return "https://chronos-dev-tk4gwh76qa-el.a.run.app";
    }
  },
};

export default config;

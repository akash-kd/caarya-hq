/* eslint-disable no-undef */
export const getDiscord = () => {
  switch (process.env.REACT_APP_ENV || "production") {
    case "local":
      return {
        server: process.env.REACT_APP_DISCORD_SERVER,
        channel: process.env.REACT_APP_DISCORD_CHANNEL,
      };
    case "development":
      return {
        server: process.env.REACT_APP_DISCORD_SERVER,
        channel: process.env.REACT_APP_DISCORD_CHANNEL,
      };
    case "production":
      return {
        server: process.env.REACT_APP_PROD_DISCORD_SERVER,
        channel: process.env.REACT_APP_PROD_DISCORD_CHANNEL,
      };
    default:
      return {
        server: process.env.REACT_APP_DISCORD_SERVER,
        channel: process.env.REACT_APP_DISCORD_CHANNEL,
      };
  }
};

export const feBaseLink = {
  applicationForm: "https://caarya-apps.web.app",
  caaryaLive: "https://caarya.live",
};

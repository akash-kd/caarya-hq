import axios from "axios";
import config from "config/APIEndpoints";

const BASE_API_URL = config.getEndpoint();
const ADMIN_API_URL = BASE_API_URL + "/api/v1";
const FORGE_ENDPOINT = BASE_API_URL + "/api/v1/app/forge";

export { BASE_API_URL };

// Util
export const getHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
};

export const getMultipartHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "multipart/form-data",
    },
  };
};

export const instance = axios.create({
  baseURL: ADMIN_API_URL,
});
export const forgeInstance = axios.create({
  baseURL: FORGE_ENDPOINT,
});


export const refreshToken = () => forgeInstance.get("/auth/token", getHeader());

import { forgeInstance, getHeader } from "config/APIs";

export const clockIn = (body) => {
  return forgeInstance.put(`/users/clock/in`, body, getHeader());
};

export const clockOut = (body) => {
  return forgeInstance.put(`/users/clock/out`, body, getHeader());
};

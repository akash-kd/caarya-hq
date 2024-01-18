import { forgeInstance, getHeader } from ".";

export const getDashboardData = () =>
  forgeInstance.get(`/dashboard`, getHeader());

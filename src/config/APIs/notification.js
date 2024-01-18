import { forgeInstance, getHeader } from "config/APIs";

export const getNotifications = (query) =>
  forgeInstance.get(
    `/notification${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

import { instance, getHeader } from "config/APIs";

export const getUserSquad = (id, query) =>
  instance.get(
    `/admin/user/student/squad${id ? `/${id}` : ""}${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

export const getUserDetails = (id) =>
  instance.get(`/admin/user/student/${id}`, getHeader());

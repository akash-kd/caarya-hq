import { getHeader, hqInstance } from "config/APIs";

export const getAllUsers = (query = {}) => {
  return hqInstance.get(`/users?` + new URLSearchParams(query), getHeader());
};

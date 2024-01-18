import { forgeInstance, getHeader } from "..";

export const findOne = (projectId) =>
  forgeInstance.get(`/project/documentation/${projectId}`, getHeader());

export const findAll = (query = {}) =>
  forgeInstance.get(
    `/project/documentation?${new URLSearchParams(query)}`,
    getHeader()
  );

export const create = (body) =>
  forgeInstance.post("/project/documentation", body, getHeader());

export const update = (id, body) =>
  forgeInstance.patch(`/project/documentation/${id}`, body, getHeader());

export const destroy = (projectId) =>
  forgeInstance.delete(`/project/documentation/${projectId}`, getHeader());

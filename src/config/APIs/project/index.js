import { instance, getHeader, forgeInstance } from "config/APIs";

export const findOne = ({ projectId }) =>
  forgeInstance.get(`/project/${projectId}`, getHeader());

/**
 * The following API has Pagination
 * @param {} query adds queries to the endpoints
 * Queries --> size, page, searchItem, sort&sort, type, is_active
 * Value for searchItem --> Search strings
 * Value for type --> Project type
 * Value for is_active --> true/false
 * Values for sort --> | values from BE |&ASC/DESC
 */
export const findAll = (query = {}) =>
  forgeInstance.get(`/project?${new URLSearchParams(query)}`, getHeader());

export const getTypesCount = (query = {}) =>
  instance.get(`admin/project/types/all`, getHeader());

export const create = ({ project, owners }) =>
  instance.post("admin/project/create", { project, owners }, getHeader());

export const update = (id, body) =>
  instance.patch(`admin/project/${id}`, body, getHeader());

export const destroy = ({ projectId }) =>
  instance.delete(`admin/project/${projectId}`, getHeader());

export const updatePriority = ({ sequence }) =>
  instance.patch(`admin/project/priority`, { sequence }, getHeader());

import { instance, getHeader } from "config/APIs";

export const createTaskType = ({ type }) =>
  instance.post(`admin/task/type/create`, { type }, getHeader());

export const updateTaskType = ({ update, typeId }) =>
  instance.patch(`admin/task/type/${typeId}`, { update }, getHeader());

export const getTaskType = ({ typeId }) =>
  instance.get(`admin/task/type/${typeId}`, getHeader());

/**
 * The following API has Pagination
 * @param {} query adds queries to the endpoints
 * Queries --> size, page, searchItem, sort&sort, user
 * Value for searchItem --> Search strings
 * Values for user --> User ID
 * Values for sort --> task_name/domain&ASC/DESC
 */
export const getAllTaskTypes = (query = {}) =>
  instance.get(
    `admin/task/type/all?${new URLSearchParams(query)}`,
    getHeader()
  );

/**
 * @param typeId Type ID
 */
export const getAllUsers = ({ typeId }) =>
  instance.get(`admin/task/type/users/${typeId}`, getHeader());

/**
 * Getting Task Type for the user
 */
export const getTaskTypeForUser = () =>
  instance.get(`admin/user/student/taskType`, getHeader());

export const deleteTaskType = ({ typeId }) =>
  instance.delete(`admin/task/type/${typeId}`, getHeader());

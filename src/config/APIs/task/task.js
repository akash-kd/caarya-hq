import { forgeInstance, getHeader, instance } from "config/APIs";

export const createTasks = (body) =>
  forgeInstance.post(`/tasks`, body, getHeader());

/**
 * To delete Tasks
 * @param id --> id of Tasks
 */
export const deleteTasks = (id) =>
  forgeInstance.delete(`/tasks/${id}`, getHeader());

/**
 * To get all Tasks
 * @param type --> Tasks
 */
export const getAllTasks = (query) =>
  forgeInstance.get(
    `/tasks${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

/**
 * Gives a Tasks
 * @param id --> id of Tasks
 */
export const getTasksById = (id, query) =>
  forgeInstance.get(
    `/tasks/${id}${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

/**
 * To update Tasks
 * @param id --> id of Tasks
 */
export const updateTasks = (id, body) =>
  forgeInstance.patch(`/tasks/${id}`, body, getHeader());

export const bulkUpdateTasks = (id, body) =>
  forgeInstance.patch(`/tasks`, { ids: id, update: body }, getHeader());

export const getAllComments = async (id) =>
  forgeInstance.get(`/users/task/comments/${id}`, getHeader());

/**
 * Add a comment to a task
 */
export const addComment = async (body) =>
  instance.post("/admin/task/comment/add", body, getHeader());

/**
 *
 * @param {} userId
 * @returns Tasks for a particular users
 */
export const getUsersTasks = (userId) =>
  forgeInstance.get(`/users/task/${userId}`, getHeader());

export const getTaskStats = (query = {}) =>
  forgeInstance.get(`/tasks/issues?${new URLSearchParams(query)}`, getHeader());

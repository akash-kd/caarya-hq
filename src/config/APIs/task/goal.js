import { getHeader, forgeInstance } from "config/APIs";

export const createGoal = (body) =>
  forgeInstance.post(`/goals`, body, getHeader());

export const updateGoal = (id, body) =>
  forgeInstance.patch(`/goals/${id}`, body, getHeader());

export const getGoal = ({ goalId }) =>
  forgeInstance.get(`/goals/${goalId}`, getHeader());

/**
 * The following API has Pagination
 * @param {} query adds queries to the endpoints
 * Queries --> size, page, searchItem, sort&sort, start_time, end_time, status, last_week, no_members, no_epics, no_due_date, to_self, admin, project, project_type
 * Value for searchItem --> Search strings
 * Values for sort --> | value from BE |&ASC/DESC
 */
export const getAllGoals = (query = {}) =>
  forgeInstance.get(`/goals?` + new URLSearchParams(query), getHeader());

export const getAllUserGoals = () =>
  forgeInstance.get(`/goals/forUserTasks?`, getHeader());

/**
 * The following API has Pagination
 * @param goalId Goal ID
 * @param {} query adds queries to the endpoints
 * Queries --> size, page, searchItem, sort&sort
 * Value for searchItem --> Search strings
 * Values for sort --> college/rank_name/role_name/caarya_id/date_of_joining/discord_id/mentor&ASC/DESC
 */
export const getTasks = ({ goalId }, query = {}) =>
  forgeInstance.get(
    `/goals/task/${goalId}?${new URLSearchParams(query)}`,
    getHeader()
  );

export const deleteGoal = ({ goalId }) =>
  forgeInstance.delete(`/goals/${goalId}`, getHeader());

export const bulkUpdateGoals = (id, body) =>
  forgeInstance.patch(`/goals`, { ids: id, update: body }, getHeader());

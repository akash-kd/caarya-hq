import { instance, getHeader } from "config/APIs";

/**
 * To create Stories
 * body={
   "students": [
   "d2b4b8c7-02d2-4757-9ae4-77b854001846",
   "7df85d43-38ff-4a8b-9824-297c896ec1e6"
   ],
   "stories": {
   "title": "test2",
   "due_date": "2022-01-20T19:27:26.000Z",
   "status": "NotStarted",
   "project_id":"2fc2bde3-a859-4343-aa02-616e2c94e9d3",
   "owner_id" : "d2b4b8c7-02d2-4757-9ae4-77b854001846"
}}
 */
export const createStories = (body) =>
  instance.post(`/admin/task/story/create`, body, getHeader());

/**
 * To delete Stories
 * @param id --> id of Stories
 */
export const deleteStories = (id) =>
  instance.delete(`/admin/task/story/destroy/${id}`, getHeader());

/**
 * To get all Stories
 * @param type --> Stories
 */
export const getAllStories = (query) =>
  instance.get(
    `/admin/task/story/all${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

/**
 * Gives a Stories
 * @param id --> id of Stories
 */
export const getStoriesById = (id, query) =>
  instance.get(
    `/admin/task/story/find/${id}${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

/**
 * To update Stories
 * @param id --> id of Stories
 */
export const updateStories = (id, body) =>
  instance.patch(`/admin/task/story/update/${id}`, body, getHeader());

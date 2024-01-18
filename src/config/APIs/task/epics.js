import { instance, getHeader } from "config/APIs";

/**
 * To create Epics
 * body={
   "students": [
   "d2b4b8c7-02d2-4757-9ae4-77b854001846",
   "7df85d43-38ff-4a8b-9824-297c896ec1e6"
   ],
   "Epics": {
   "title": "test2",
   "due_date": "2022-01-20T19:27:26.000Z",
   "status": "NotStarted",
   "project_id":"2fc2bde3-a859-4343-aa02-616e2c94e9d3",
   "owner_id" : "d2b4b8c7-02d2-4757-9ae4-77b854001846"
}}
 */
export const createEpics = (body) =>
  instance.post(`/admin/task/epic/create`, body, getHeader());

/**
 * To delete Epics
 * @param id --> id of Epics
 */
export const deleteEpics = (id) =>
  instance.delete(`/admin/task/epic/destroy/${id}`, getHeader());

/**
 * To get all Epics
 * @param type --> Epics
 */
export const getAllEpics = (query) =>
  instance.get(
    `/admin/task/epic/all${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

/**
 * Gives a Epics
 * @param id --> id of Epics
 */
export const getEpicsById = (id, query) =>
  instance.get(
    `/admin/task/epic/find/${id}${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

/**
 * To update Epics
 * @param id --> id of Epics
 */
export const updateEpics = (id, body) =>
  instance.patch(`/admin/task/epic/update/${id}`, body, getHeader());

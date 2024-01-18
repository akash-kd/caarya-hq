// APIs for Events, Events Type & Events Category

import { getHeader, instance, liveInstance } from ".";

/**
 * Gives a Events Stats
 * @param type --> events
 */
export const getEventsStats = () =>
  instance.get(`/admin/events/count`, getHeader());

/**
 * To create Event Management Type or Category
 */
export const createEvents = (body) =>
  liveInstance.post(`/events`, body, getHeader());

/**
 * To delete Event Management Type or Category
 * @param id --> id of Event Management Type or Category
 */
export const deleteEvents = (id) =>
  liveInstance.delete(`/events/${id}`, getHeader());

/**
 * To get all Event Management Type or Category
 */
export const getAllEvents = (query) =>
  liveInstance.get(
    `/events${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

/**
 * Gives a Event Management Type or Category
 * @param id --> id of Event Management Type or Category
 */
export const getEventsById = (id) =>
  liveInstance.get(`/events${id}`, getHeader());

/**
 * To update Event Management or Event Management type
 * @param id --> id of Event Management Type or Category
 */
export const updateEvents = (id, body) =>
  liveInstance.patch(`/events${id}`, body, getHeader());

/**
 * To get all Event Management Type or Category
 */
export const getAllEventTypes = (query) =>
  instance.get(
    `/admin/events/type/all${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

export const getAllEventCategory = (query) =>
  instance.get(
    `/admin/events/category/all${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

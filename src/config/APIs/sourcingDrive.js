/**
 * The file contains all Sourcing Drive related CRUDS
 */

import { getHeader, instance, liveInstance } from ".";

/**
 * To create
 */
export const createEntity = (body) =>
  instance.post(`/admin/sourcingDrive`, body, getHeader());

/**
 * To delete
 * @param id --> id of the entity
 */
export const deleteEntity = (id) =>
  instance.delete(`/admin/sourcingDrive/${id}`, getHeader());

/**
 * To get all
 */
export const getAllEntity = (query = {}) =>
  liveInstance.get(
    `/drives${
      Object.keys(query)?.length > 0 ? `?${new URLSearchParams(query)}` : ""
    }`,
    getHeader()
  );

/**
 * Gives
 * @param id --> id
 */
export const getOneEntity = (id) => instance.get(`/drives/${id}`, getHeader());

/**
 * To update
 * @param id --> id of the entity
 */
export const updateEntity = (id, body) =>
  instance.patch(`/admin/sourcingDrive/${id}`, body, getHeader());

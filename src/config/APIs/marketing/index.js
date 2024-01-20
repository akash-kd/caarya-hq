import { instance, getHeader } from "..";

/**
 * The file contains all marketing related CRUDS
 * Values of type can be:
 *   * contentOffering
 *   * campaign
 *   * character
 *   * conflict
 *   * contentPillars
 *   * contentTypes
 *   * contentPlatform
 *   * topicCluster
 *   * contentBucket
 */

/**
 * To create
 */
export const createEntity = (type, body) =>
  instance.post(`/admin/marketing/${type}`, body, getHeader());

/**
 * To delete
 * @param id --> id of the entity
 */
export const deleteEntity = (type, id) =>
  instance.delete(`/admin/marketing/${type}/${id}`, getHeader());

/**
 * To get all
 */
export const getAllEntity = (type, query = {}) =>
  instance.get(
    `/admin/marketing/${type}/all${
      Object.keys(query)?.length > 0 ? `?${new URLSearchParams(query)}` : ""
    }`,
    getHeader()
  );

/**
 * Gives
 * @param id --> id of attributes or attributeTypes
 */
export const getOneEntity = (type, id) =>
  instance.get(`/admin/marketing/${type}/${id}`, getHeader());

/**
 * To update
 * @param id --> id of the entity
 */
export const updateEntity = (type, id, body) =>
  instance.patch(`/admin/marketing/${type}/${id}`, body, getHeader());

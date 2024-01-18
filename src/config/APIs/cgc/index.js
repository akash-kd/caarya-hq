import { getHeader } from "..";
import { liveInstance } from "..";

/**
 * The following API has Pagination
 * @param {} query adds queries to the endpoints
 * Queries --> size, page, searchItem, sort&sort, college_location
 * Value for searchItem --> Search strings
 * Values for sort --> college_name/college_location/archived/type&ASC/DESC
 * Values for college_location --> String (Can be sent as multiple queries)
 */
export const findAll = async (query = {}) =>
  liveInstance.get(`/colleges/cgc?${new URLSearchParams(query)}`, getHeader());

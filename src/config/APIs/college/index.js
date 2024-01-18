import { getHeader, instance, liveInstance } from "..";

/**
 * The following API has Pagination
 * @param {} query adds queries to the endpoints
 * Queries --> size, page, searchItem, sort&sort, type
 * Value for searchItem --> Search strings
 * Value for type --> true/false to get the list of types of link
 */
export const findAllInsights = (query = {}) => {
  return instance.get(
    `/admin/dashboard/analytics/college-students?${new URLSearchParams(query)}`,
    getHeader()
  );
};

/**
 * The following API has Pagination
 * @param {} query adds queries to the endpoints
 * Queries --> size, page, searchItem, sort&sort, college_location
 * Value for searchItem --> Search strings
 * Values for sort --> college_name/college_location/archived/type&ASC/DESC
 * Values for college_location --> String (Can be sent as multiple queries)
 */
export const findAll = async (type = "colleges", query = {}) =>
  liveInstance.get(`/colleges?${new URLSearchParams(query)}`, getHeader());

export const getCollegeById = async (type = "colleges", id) =>
  liveInstance.get(`/colleges/${id}`, getHeader());

import { getHeader, instance } from "config/APIs";

/**
 * The following API has Pagination
 * @param {} query adds queries to the endpoints
 * Queries --> size, page, searchItem, sort&sort, rank_type, is_active, college, role_type
 * Value for searchItem --> Search strings
 * Values for is_active --> true/false
 * Values for rank_type -->
 * Values for sort --> college/rank_name/role_name/caarya_id/date_of_joining/discord_id/mentor&ASC/DESC
 */
export const getAllUsersAdmin = (query = {}) => {
  return instance.get(
    `/admin/user/student/all?` + new URLSearchParams(query),
    getHeader()
  );
};

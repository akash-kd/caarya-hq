import { getHeader, instance } from "..";

/**
 * The following API has Pagination
 * @param {} query adds queries to the endpoints
 * Queries --> size, page, searchItem, sort&sort, type
 * Value for searchItem --> Search strings
 * Value for type --> true/false to get the list of types of link
 */
export const findAll = (query = {}) => {
  return instance.get(
    `/admin/short-url/all?${new URLSearchParams(query)}`,
    getHeader()
  );
};

export const findOne = (id) => {
  return instance.get(`/admin/short-url/${id}`, getHeader());
};
export const destroy = (id) => {
  return instance.delete(`/admin/short-url/${id}`, getHeader());
};
export const create = (shortUrlBody) => {
  return instance.post(`/admin/short-url`, shortUrlBody, getHeader());
};

export const update = ({ id, update }) =>
  instance.patch(`/admin/short-url/${id}`, { update }, getHeader());

export const redirectToUrl = (body) =>
  instance.post(`/public/shortUrl`, body, getHeader());

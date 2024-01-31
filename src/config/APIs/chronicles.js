import { getHeader, hqInstance } from ".";
export const createChronicles = (body) =>
  hqInstance.post(`/chronicle`, body, getHeader());

export const deleteChronicles = (id) =>
  hqInstance.delete(`/chronicle/${id}`, getHeader());

export const getAllChronicles = (query) =>
  hqInstance.get(
    `/chronicle${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

export const getAllProducts = (query) =>
  hqInstance.get(
    `/product${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

export const getChroniclesById = (id) =>
  hqInstance.get(`/chronicle?${new URLSearchParams(id)}`, getHeader());

export const updateChronicles = (id, body) =>
  hqInstance.patch(`/chronicle/${id}`, body, getHeader());

import { getHeader, liveInstance } from ".";
export const createChronicles = (body) =>
  liveInstance.post(`/chronicle`, body, getHeader());

export const deleteChronicles = (id) =>
  liveInstance.delete(`/chronicle/${id}`, getHeader());

export const getAllChronicles = (query) =>
  liveInstance.get(
    `/chronicle${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

export const getAllProducts = (query) =>
  liveInstance.get(
    `/product${
      query && Object.keys(query).length > 0
        ? `?${new URLSearchParams(query)}`
        : ""
    }`,
    getHeader()
  );

export const getChroniclesById = (id) =>
  liveInstance.get(`/chronicle${id}`, getHeader());

export const updateChronicles = (id, body) =>
  liveInstance.patch(`/chronicle${id}`, body, getHeader());

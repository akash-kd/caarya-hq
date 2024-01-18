import { forgeInstance, getHeader } from ".";

export const findOneTrack = (id) =>
  forgeInstance.get(`/tracks/${id}`, getHeader());

export const findAllTracks = (query = {}) =>
  forgeInstance.get(`/tracks?${new URLSearchParams(query)}`, getHeader());

export const createATrack = (body) =>
  forgeInstance.post("/tracks", body, getHeader());

export const updateATrack = (id, body) =>
  forgeInstance.patch(`/tracks/${id}`, body, getHeader());

export const destroyATrack = (id) =>
  forgeInstance.delete(`/tracks/${id}`, getHeader());

export const findMyTracks = (query = {}) =>
  forgeInstance.get(`/tracks/my`, getHeader());

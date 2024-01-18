import { liveInstance, getHeader } from ".";

export const findOneTrack = (id) =>
  liveInstance.get(`/tracks/${id}`, getHeader());

export const findAllTracks = (query = {}) =>
  liveInstance.get(`/tracks?${new URLSearchParams(query)}`, getHeader());

export const createATrack = (body) =>
  liveInstance.post("/tracks", body, getHeader());

export const updateATrack = (id, body) =>
  liveInstance.patch(`/tracks/${id}`, body, getHeader());

export const destroyATrack = (id) =>
  liveInstance.delete(`/tracks/${id}`, getHeader());

export const findMyTracks = (query = {}) =>
  liveInstance.get(`/tracks/my`, getHeader());

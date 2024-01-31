import { forgeInstance, getHeader } from "config/APIs";

export const startSession = (body) =>
  forgeInstance.post(`/session/start`, body, getHeader());

export const endSession = (body) =>
  forgeInstance.put(`/session/end`, body, getHeader());

export const extendSession = (body) =>
  forgeInstance.post("/session/update", body, getHeader());

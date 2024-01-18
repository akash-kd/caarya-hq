import { forgeInstance, getHeader } from "config/APIs";

export const startSession = (body) =>
  forgeInstance.post(`/session/start`, body, getHeader());

export const endSession = (body) =>
  forgeInstance.put(`/session/end`, body, getHeader());

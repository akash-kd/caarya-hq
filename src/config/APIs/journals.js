import { forgeInstance, getHeader } from ".";

export const findOneJournal = (id) =>
  forgeInstance.get(`/journals/${id}`, getHeader());

export const findAllJournals = (query = {}) =>
  forgeInstance.get(`/journals?${new URLSearchParams(query)}`, getHeader());

export const createAJournal = (body) =>
  forgeInstance.post("/journals", body, getHeader());

export const updateAJournal = (id, body) =>
  forgeInstance.patch(`/journals/${id}`, body, getHeader());

export const destroyAJournal = (id) =>
  forgeInstance.delete(`/journals/${id}`, getHeader());

export const findMyJournals = (query = {}) =>
  forgeInstance.get(`/journals/my`, getHeader());

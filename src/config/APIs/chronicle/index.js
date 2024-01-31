import { instance } from "..";

export async function addChronicle(body) {
  return instance.post("hq/chron", body);
}

export async function getAllChronicle(query) {
  return instance.get(`hq/chron?${new URLSearchParams(query)}`);
}

export async function deleteChronicle(id) {
  return instance.delete(`/hq/chron/${id}`);
}

export async function updateChronicle(id) {
  return instance.patch(`/hq/chron/${id}`);
}

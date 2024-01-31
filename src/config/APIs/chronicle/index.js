import { instance } from "..";

export async function addChronicle(body) {
  return instance.post("hq/chronicle", body);
}

export async function getAllChronicle(query) {
  return instance.get(`hq/chronicle?${new URLSearchParams(query)}`);
}

export async function deleteChronicle(id) {
  return instance.delete(`/hq/chronicle/${id}`);
}

export async function updateChronicle(id) {
  return instance.patch(`/hq/chronicle/${id}`);
}

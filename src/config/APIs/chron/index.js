import { instance } from "..";

export async function addChron(body) {
  instance.post("/chronicles", body);
}

export async function getAllChron() {
  return instance.get("/chronicles");
}

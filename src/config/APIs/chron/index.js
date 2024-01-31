import { instance } from "..";

export async function addChron(body) {
  instance.post("/chron/add", body);

  // const a = instance.post("/chron/add", );
}

export async function getAllChron() {
  return instance.get("/chron/get");
}

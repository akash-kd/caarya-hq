import { instance } from "..";
import axios from "axios";

export async function addChron(body) {
  axios.post("http://localhost:4193/api/v1/chron/add", body);

  // const a = instance.post("/chron/add", );
}

export async function getAllChron() {
  return axios.get("http://localhost:4193/api/v1/chron/get");
}

import { instance, getMultipartHeader } from "config/APIs";

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return instance.post(`/file/upload`, formData, getMultipartHeader());
};

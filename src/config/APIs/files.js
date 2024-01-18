import { getHeader } from "config/APIs";
import { getMultipartHeader } from "config/APIs";
import { instance } from "config/APIs";

export const uploadFile = ({ file }) => {
  const formData = new FormData();
  formData.append("file", file);
  return instance.post(`/file/upload`, formData, getMultipartHeader());
};

export const deleteFile = ({ id }) =>
  instance.delete(`/file/${id}`, getHeader());

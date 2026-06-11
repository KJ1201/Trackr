import api from "./api";

export const getDocuments = () => api.get("documents/");
export const createDocument = (data) =>
  api.post("documents/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateDocument = (id, data) => api.patch(`documents/${id}/`, data);
export const deleteDocument = (id) => api.delete(`documents/${id}/`);

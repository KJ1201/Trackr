import api from "./api";

export const getContacts = () => api.get("contacts/");
export const getContact = (id) => api.get(`contacts/${id}/`);
export const createContact = (data) => api.post("contacts/", data);
export const updateContact = (id, data) =>
  api.patch(`contacts/${id}/`, data);
export const deleteContact = (id) => api.delete(`contacts/${id}/`);
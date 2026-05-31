import api from "./api";

export const getApplications = () => api.get("applications/");
export const getApplication = (id) => api.get(`applications/${id}/`);
export const createApplication = (data) => api.post("applications/", data);
export const updateApplication = (id, data) =>
  api.patch(`applications/${id}/`, data);
export const updateStatus = (id, status) =>
  api.patch(`applications/${id}/update-status/`, { status });
export const deleteApplication = (id) => api.delete(`applications/${id}/`);
export const getDashboardStats = () => api.get(`applications/dashboard/`);

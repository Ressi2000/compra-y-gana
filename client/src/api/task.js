import axios from "./axios";

export const getTasksRequest = () => axios.get(`/admin/tasks`);
export const getTaskRequest = (id) => axios.get(`/admin/tasks/${id}`);
export const createTaskRequest = (task) => axios.post(`/admin/tasks`, task);
export const updateTaskRequest = (id, task) => axios.put(`/admin/tasks/${id}`, task);
export const deleteTaskRequest = (id) => axios.delete(`/admin/tasks/${id}`);

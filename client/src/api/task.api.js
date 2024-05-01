import axios from "axios";

const BASE_URL = "https://task-mern-sql-production.up.railway.app/tasks";

export const getTasksRequest = async () =>
    await axios.get(BASE_URL);

export const createTaskRequest = async (task) =>
    await axios.post(BASE_URL, task);

export const deleteTaskRequest = async (id) =>
    await axios.delete(`${BASE_URL}/${id}`);

export const getTaskRequest = async (id) =>
    await axios.get(`${BASE_URL}/${id}`);

export const updateTaskRequest = async (id, newFields) =>
    await axios.patch(`${BASE_URL}/${id}`, newFields);

export const toggleTaskDoneRequest = async (id, done) =>
    await axios.patch(`${BASE_URL}/${id}`, { done });
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/tasks";

export const fetchTasks = () => axios.get(API_BASE_URL);

export const addTask = (title) =>
    axios.post(API_BASE_URL, { title });

export const deleteTask = (id) =>
    axios.delete(`${API_BASE_URL}/${id}`);
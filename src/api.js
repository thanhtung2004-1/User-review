import axios from "axios";

const API_URL = "http://localhost:8888";

export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);
export const addUser = (data) => axios.post(`${API_URL}/users`, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);
import axios from "./axios";

export const registerRequest = (user) => axios.post(`/admin/register`, user);
export const loginRequest = (user) => axios.post(`/admin/login`, user);
export const verifyTokenRequest = () => axios.get('/admin/verify');
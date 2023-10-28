import axios from "./axios";

export const getDolarBcvRequest = () => axios.get(`/admin/api-dolar-bcv`);
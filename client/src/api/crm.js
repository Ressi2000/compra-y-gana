import axios from "./axios";

export const getCrmsRequest = () => axios.get(`/admin/crm`);
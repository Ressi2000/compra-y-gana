import axios from "./axios";

export const getFormsRequest = () => axios.get(`/admin/formulario`);

export const createFormRequest = (form, config) => {
  return axios.post(`/formulario`, form, config);
};

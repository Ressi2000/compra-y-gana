import axios from "./axios";

export const getStoreRequest = () => axios.get(`/stores`);



export const getStoresRequest = () => axios.get(`/admin/stores`);
export const getStoreEditRequest = (id) => axios.get(`/admin/stores/${id}`);
export const createStoreRequest = (store) => {
    return axios.post("/admin/stores", store);
};
export const updateStoreRequest = (id, updatedStoreData) => {   
    return axios.put(`/admin/stores/${id}`, updatedStoreData);
}
export const deleteStoreRequest = (id) => axios.delete(`/admin/stores/${id}`);

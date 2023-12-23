import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export const getBreedsData = (params) => {
  return axios.get(`${apiUrl}/breeds`, { params });
};
export const sendBreedsData = (formData) => {
  return axios.postForm(`${apiUrl}/breeds`, formData);
};

export const updateBreedsData = (id, formData) => {
  return axios.postForm(`${apiUrl}/breeds/${id}?_method=PUT`, formData);
};

export const deleteBreedsData = (id) => {
  return axios.delete(`${apiUrl}/breeds/${id}`);
};

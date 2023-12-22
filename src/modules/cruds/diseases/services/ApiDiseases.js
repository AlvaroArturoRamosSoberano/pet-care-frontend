import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export const getDiseasesData = (params) => {
  return axios.get(`${apiUrl}/diseases`, { params });
};

export const sendDiseasesData = (formData) => {
  return axios.postForm(`${apiUrl}/diseases`, formData);
};

export const updateDiseasesData = (id, formData) => {
  return axios.postForm(`${apiUrl}/diseases/${id}?_method=PUT`, formData);
};

export const deleteDiseasesData = (id) => {
  return axios.delete(`${apiUrl}/diseases/${id}`);
};

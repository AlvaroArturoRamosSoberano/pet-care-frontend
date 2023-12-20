import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export const getSpeciesData = (params) => {
  return axios.get(`${apiUrl}/species`, { params });
};

export const getSpecieData = (id) => {
  return axios.get(`${apiUrl}/species/${id}`);
};

export const sendSpeciesData = (formData) => {
  return axios.postForm(`${apiUrl}/species`, formData);
};

export const updateSpeciesData = (id, formData) => {
  return axios.postForm(`${apiUrl}/species/${id}?_method=PUT`, formData);
};

export const deleteSpeciesData = (id) => {
  return axios.delete(`${apiUrl}/species/${id}`);
};

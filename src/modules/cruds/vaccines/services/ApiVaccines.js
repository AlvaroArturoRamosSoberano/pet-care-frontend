import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export const getVaccinesData = (params) => {
  return axios.get(`${apiUrl}/vaccines`, { params });
};

export const getVaccineData = (id) => {
  return axios.get(`${apiUrl}/vaccines/${id}`);
};

export const sendVaccinesData = (formData) => {
  return axios.postForm(`${apiUrl}/vaccines`, formData);
};

export const updateVaccinesData = (id, formData) => {
  return axios.postForm(`${apiUrl}/vaccines/${id}?_method=PUT`, formData);
};

export const deleteVaccinesData = (id) => {
  return axios.delete(`${apiUrl}/vaccines/${id}`);
};

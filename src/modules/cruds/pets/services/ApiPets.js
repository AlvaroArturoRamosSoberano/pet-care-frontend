import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export const getPetsData = () => {
  return axios.get(`${apiUrl}/pets`);
};

export const getPetData = (id) => {
  return axios.get(`${apiUrl}/pets/${id}`);
};

export const sendPetsData = (formData) => {
  return axios.postForm(`${apiUrl}/pets`, formData);
};

export const updatePetsData = (id, formData) => {
  return axios.postForm(`${apiUrl}/pets/${id}?_method=PUT`, formData);
};

export const deletePetsData = (id) => {
  return axios.delete(`${apiUrl}/pets/${id}`);
};

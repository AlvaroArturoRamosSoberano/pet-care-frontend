import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

export const getCustomersData = () => {
  return axios.get(`${apiUrl}/customers`);
};

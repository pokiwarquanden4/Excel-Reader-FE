import axios from "axios";

const URL = "http://localhost:8080";

export const getTable = () => {
  return axios.get(`${URL}/getUsers`);
};

export const importExcel = (payload) => {
  return axios.post(`${URL}/excelReader`, payload);
};

export const exportExcel = (fileName, filePath) => {
  return axios.post(`${URL}/exportExcel/${fileName}`, { data: filePath });
};

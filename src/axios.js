import axios from 'axios';
import CryptoJS from 'crypto-js';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const getConfig = () => {
  const token = localStorage.getItem('userToken');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};


export const userLogin = async (username, password) => {  
  const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_KEY_CRYPTOGRAPHY);
  const iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_KEY_CRYPTOGRAPHY);

  const encryptedPassword = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  try {
    const response = await axios.post(`${API_BASE_URL}/users/login/`, { username, password: encryptedPassword });
    return response;
  } catch (error) {
    throw error;
  }
};


export const getFiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pdf/upload/`, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};


export const getSpecificFiles = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/pdf/upload/${id}`, {}, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};


export const getDiagnosis = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diagnosis/generate/${id}`, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};


export const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pdf/upload/`, formData, getConfig());
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/patients/`, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};


export const deleteFile = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/pdf/delete/${id}/`, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
}


export const diagnosisGenerate = async (id, data) => {
  const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_KEY_CRYPTOGRAPHY);
  const iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_KEY_CRYPTOGRAPHY);

  const encryptedPassword = CryptoJS.AES.encrypt(data.password, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  console.log(encryptedPassword);
  data.password = encryptedPassword;

  try {
    const response = await axios.post(`${API_BASE_URL}/diagnosis/generate/${id}/`, data, getConfig());
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateDiagnosis = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/diagnosis/generate/${id}/`,{}, getConfig());
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const approvedDiagnosis = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/diagnosis/generate/${id}/`,{}, getConfig());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/all`, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};


export const createUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/create/`, data, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};


export const getUserUpdate = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/update/${id}/`, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};


export const updateUser = async (data, id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/update/${id}/`, data, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};


export const inativeUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/update/${id}/`, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};


export const updateDiagnosisText = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/diagnosis/update-diagnosis/${id}/`, data, getConfig());
    return response;
  } catch (error) {
    throw error;
  }
};

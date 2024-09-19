import axios from 'axios';
import CryptoJS from 'crypto-js';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const getConfig = () => {
  const token = localStorage.getItem('userToken');
  return {
    headers: { Authorization: `Bearer ${token}` }
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
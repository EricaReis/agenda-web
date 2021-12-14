import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://vexcontacts-api.herokuapp.com/',
});

api.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem('token');
  config.headers!['Authorization'] =  `Bearer ${token}`;

  return config;
});

export default api;

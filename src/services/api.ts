import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://vexcontacts-api.herokuapp.com/',
});

axios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = 'store.getState().session.token';
  config.headers!['Authorization'] =  token;

  return config;
});

export default api;

import axios from 'axios';
import { paramsSerializer } from '../lib/utils';

const http = axios.create({
  baseURL: 'https://node-fake-api-server.herokuapp.com',
  paramsSerializer,
});

http.interceptors.request.use(
  (config) => {
    const userHeaders = {
      'Content-Type': 'application/json',
    };

    //  const token = Cookies.get('user') || '';
    //  userHeaders['authorization'] = `Bearer ${token}`;

    config.headers = { ...config.headers, ...userHeaders };
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export default http;

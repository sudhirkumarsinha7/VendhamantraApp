import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../config/constants';

const api = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // You might want to dispatch a logout action here
    }
    return Promise.reject(error);
  }
);

export default api;
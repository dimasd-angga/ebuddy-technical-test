import axios from 'axios';
import { User } from '@ebuddy-user-management/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const userApi = {
  register: async (userData: User) => {
    const response = await apiClient.post('/user/create', userData);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post('/user/login', { email, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/user/me');
    return response.data;
  },

  updateUser: async (userData: Partial<User>) => {
    const response = await apiClient.put('/user/update', userData);
    return response.data;
  },

  getAllUsers: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get(`/user/all?page=${page}&limit=${limit}`);
    return response.data;
  },
};

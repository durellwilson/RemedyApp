// frontend/src/services/api.js
import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

// Handle response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      auth.signOut();
    }
    return Promise.reject(error);
  }
);

export const api = {
  getRemedies: async () => {
    try {
      const response = await axiosInstance.get('/remedies');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch remedies');
    }
  },

  getRemedy: async (id) => {
    try {
      const response = await axiosInstance.get(`/remedies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch remedy');
    }
  },

  createRemedy: async (remedyData) => {
    try {
      const response = await axiosInstance.post('/remedies', remedyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create remedy');
    }
  },

  updateRemedy: async (id, remedyData) => {
    try {
      const response = await axiosInstance.put(`/remedies/${id}`, remedyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update remedy');
    }
  },

  deleteRemedy: async (id) => {
    try {
      const response = await axiosInstance.delete(`/remedies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete remedy');
    }
  }
};

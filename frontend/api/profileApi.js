import axios from 'axios';
import { getToken } from './getToken';

const API_BASE_URL = 'http://localhost:3000';

// Create axios instance with base configuration
const profileApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Firebase token
profileApi.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      console.error('Failed to get auth token:', error);
      throw error;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
profileApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - will be handled by global auth listener
      console.error('Authentication failed - token may be expired');
    }
    return Promise.reject(error);
  }
);

export const ProfileAPI = {
  // Sync profile from Firebase auth data
  syncProfile: async () => {
    try {
      const response = await profileApi.post('/person/sync');
      return response.data;
    } catch (error) {
      console.error('Profile sync failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get current user's profile
  getProfile: async () => {
    try {
      const response = await profileApi.get('/person/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Complete profile with additional data
  completeProfile: async (profileData) => {
    try {
      const response = await profileApi.post('/person/complete', profileData);
      return response.data;
    } catch (error) {
      console.error('Complete profile failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Update profile
  updateProfile: async (updateData) => {
    try {
      const response = await profileApi.put('/person/profile', updateData);
      return response.data;
    } catch (error) {
      console.error('Update profile failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Test API endpoint
  testApi: async () => {
    try {
      const response = await profileApi.get('/test/testapi');
      return response.data;
    } catch (error) {
      console.error('Test API failed:', error.response?.data || error.message);
      throw error;
    }
  },
};
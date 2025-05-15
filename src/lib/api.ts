
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// API response type
export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  status: number;
  success: boolean;
}

// API base URL - should be set in your environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

// Create an axios instance with default configs
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000 // 15 seconds
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function to process API responses
const processResponse = async <T>(promise: Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> => {
  try {
    const response = await promise;
    return {
      data: response.data,
      error: null,
      status: response.status,
      success: true
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      data: null,
      error: axiosError.response?.data as string || axiosError.message || 'Unknown error occurred',
      status: axiosError.response?.status || 500,
      success: false
    };
  }
};

// HTTP GET request
export const get = <T>(url: string, params?: object): Promise<ApiResponse<T>> => {
  return processResponse<T>(api.get(url, { params }));
};

// HTTP POST request
export const post = <T>(url: string, data: any): Promise<ApiResponse<T>> => {
  return processResponse<T>(api.post(url, data));
};

// HTTP PUT request
export const put = <T>(url: string, data: any): Promise<ApiResponse<T>> => {
  return processResponse<T>(api.put(url, data));
};

// HTTP PATCH request
export const patch = <T>(url: string, data: any): Promise<ApiResponse<T>> => {
  return processResponse<T>(api.patch(url, data));
};

// HTTP DELETE request
export const del = <T>(url: string): Promise<ApiResponse<T>> => {
  return processResponse<T>(api.delete(url));
};

// Upload file
export const uploadFile = <T>(url: string, file: File, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<T>> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  };
  
  return processResponse<T>(api.post(url, formData, config));
};

// Export default API
export default api;

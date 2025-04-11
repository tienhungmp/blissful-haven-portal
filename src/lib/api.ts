
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'sonner';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response interface
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
  success: boolean;
}

// Request function with error handling
export const apiRequest = async <T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api(config);
    
    return {
      data: response.data,
      error: null,
      status: response.status,
      success: true
    };
  } catch (err) {
    const error = err as AxiosError;
    const status = error.response?.status || 500;
    const errorMessage = extractErrorMessage(error);
    
    // Log the error to console
    console.error('API Error:', error);
    
    // Show toast notification for error (optional, can be commented out)
    toast.error(errorMessage);
    
    return {
      data: null,
      error: errorMessage,
      status,
      success: false
    };
  }
};

// Helper function to extract error message
const extractErrorMessage = (error: AxiosError): string => {
  if (error.response) {
    // Server responded with a non-2xx status
    const data = error.response.data as any;
    return data.message || data.error || `Server error: ${error.response.status}`;
  } else if (error.request) {
    // Request was made but no response received
    return 'No response from server. Please check your connection.';
  } else {
    // Error in setting up the request
    return error.message || 'An unexpected error occurred';
  }
};

// Add request interceptor (optional)
api.interceptors.request.use(
  (config) => {
    // You can modify config here before request is sent
    // For example, add auth token
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Convenience methods for common HTTP operations
export const get = <T>(url: string, params?: object, config?: AxiosRequestConfig) => {
  return apiRequest<T>({
    method: 'GET',
    url,
    params,
    ...config
  });
};

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return apiRequest<T>({
    method: 'POST',
    url,
    data,
    ...config
  });
};

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return apiRequest<T>({
    method: 'PUT',
    url,
    data,
    ...config
  });
};

export const patch = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return apiRequest<T>({
    method: 'PATCH',
    url,
    data,
    ...config
  });
};

export const del = <T>(url: string, config?: AxiosRequestConfig) => {
  return apiRequest<T>({
    method: 'DELETE',
    url,
    ...config
  });
};

export default api;

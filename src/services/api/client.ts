import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from './config';
import { AppError } from '../../utils/errorHandler';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new AppError('Request failed', 'REQUEST_ERROR'));
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      throw new AppError('Network error', 'NETWORK_ERROR', 0);
    }

    switch (error.response.status) {
      case 401:
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        throw new AppError('Session expired. Please log in again.', 'AUTH_ERROR', 401);

      case 403:
        throw new AppError('Access denied', 'FORBIDDEN', 403);

      case 404:
        throw new AppError('Resource not found', 'NOT_FOUND', 404);

      case 422:
        throw new AppError('Validation failed', 'VALIDATION_ERROR', 422);

      case 429:
        throw new AppError('Too many requests. Please try again later.', 'RATE_LIMIT', 429);

      case 500:
        throw new AppError('Server error', 'SERVER_ERROR', 500);

      default:
        throw new AppError('An unexpected error occurred', 'UNKNOWN_ERROR', error.response.status);
    }
  }
);

export default apiClient;
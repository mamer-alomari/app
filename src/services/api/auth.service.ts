import apiClient from './client';
import { API_ENDPOINTS } from './config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    // TODO: Implement actual API integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: credentials.email,
            name: credentials.email.split('@')[0],
          },
          token: 'mock-jwt-token',
        });
      }, 1000);
    });
  },

  async register(data: RegisterData) {
    // TODO: Implement actual API integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: data.email,
            name: data.name,
          },
          token: 'mock-jwt-token',
        });
      }, 1000);
    });
  },

  async logout() {
    // TODO: Implement actual API integration
    localStorage.removeItem('authToken');
    return Promise.resolve();
  },
};
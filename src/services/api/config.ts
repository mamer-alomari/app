export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile/update',
  },
  JOBS: {
    LIST: '/jobs',
    DETAILS: (id: string) => `/jobs/${id}`,
    CREATE: '/jobs',
    UPDATE: (id: string) => `/jobs/${id}`,
    TRACK: (id: string) => `/jobs/${id}/track`,
  },
  QUOTES: {
    LIST: '/quotes',
    DETAILS: (id: string) => `/quotes/${id}`,
    CREATE: '/quotes',
    UPDATE: (id: string) => `/quotes/${id}`,
  },
  PAYMENTS: {
    METHODS: '/payments/methods',
    ADD_METHOD: '/payments/methods/add',
    PROCESS: '/payments/process',
    HISTORY: '/payments/history',
  },
  BILLING: {
    INVOICES: '/billing/invoices',
    INVOICE_DETAILS: (id: string) => `/billing/invoices/${id}`,
  }
};
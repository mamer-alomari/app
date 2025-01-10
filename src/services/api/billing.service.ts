import apiClient from './client';
import { API_ENDPOINTS } from './config';

export interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  items: Array<{
    description: string;
    quantity: number;
    price: string;
  }>;
}

export const billingService = {
  async getInvoices() {
    // TODO: Implement actual API integration
    return new Promise<Invoice[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'INV-1234',
            date: '2024-02-15',
            dueDate: '2024-03-01',
            amount: '1,200.00',
            status: 'pending',
            items: [
              {
                description: 'Moving Service - Small Items',
                quantity: 2,
                price: '300.00'
              }
            ]
          }
        ]);
      }, 1000);
    });
  },

  async getInvoiceById(id: string) {
    // TODO: Implement actual API integration
    return new Promise<Invoice>((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          date: '2024-02-15',
          dueDate: '2024-03-01',
          amount: '1,200.00',
          status: 'pending',
          items: [
            {
              description: 'Moving Service - Small Items',
              quantity: 2,
              price: '300.00'
            }
          ]
        });
      }, 1000);
    });
  }
};
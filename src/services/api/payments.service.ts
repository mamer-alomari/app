import apiClient from './client';
import { API_ENDPOINTS } from './config';

export interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expMonth: number;
  expYear: number;
  brand: string;
}

export interface Payment {
  id: string;
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  method: PaymentMethod;
  date: string;
}

export const paymentsService = {
  async getPaymentMethods() {
    // TODO: Implement actual API integration
    return new Promise<PaymentMethod[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'pm_1234',
            type: 'card',
            last4: '4242',
            expMonth: 12,
            expYear: 2024,
            brand: 'Visa'
          }
        ]);
      }, 1000);
    });
  },

  async addPaymentMethod(data: any) {
    // TODO: Implement actual API integration with Stripe
    return new Promise<PaymentMethod>((resolve) => {
      setTimeout(() => {
        resolve({
          id: `pm_${Math.random().toString(36).substr(2, 9)}`,
          type: 'card',
          last4: data.card.last4,
          expMonth: data.card.exp_month,
          expYear: data.card.exp_year,
          brand: data.card.brand
        });
      }, 1000);
    });
  },

  async processPayment(amount: string, paymentMethodId: string) {
    // TODO: Implement actual API integration with Stripe
    return new Promise<Payment>((resolve) => {
      setTimeout(() => {
        resolve({
          id: `pay_${Math.random().toString(36).substr(2, 9)}`,
          amount,
          status: 'completed',
          method: {
            id: paymentMethodId,
            type: 'card',
            last4: '4242',
            expMonth: 12,
            expYear: 2024,
            brand: 'Visa'
          },
          date: new Date().toISOString()
        });
      }, 1000);
    });
  }
};
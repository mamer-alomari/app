import apiClient from './client';
import { API_ENDPOINTS } from './config';

export interface Quote {
  id: string;
  date: string;
  items: Array<{
    name: string;
    size: string;
    quantity: number;
  }>;
  source: string;
  destination: string;
  distance: string;
  eta: string;
  price: string;
  status: 'pending' | 'accepted' | 'expired';
}

export const quotesService = {
  async getQuotes() {
    // TODO: Implement actual API integration
    return new Promise<Quote[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'QT-1234',
            date: '2024-02-15',
            items: [
              { name: 'Arm Chairs', size: 'Small', quantity: 2 },
              { name: '3 Seater Sofa', size: 'Large', quantity: 1 }
            ],
            source: '940 Strooman Key. Apt 334',
            destination: '123 New Address St.',
            distance: '50km',
            eta: '1:30 hr',
            price: '1,200.00',
            status: 'pending'
          }
        ]);
      }, 1000);
    });
  },

  async getQuoteById(id: string) {
    // TODO: Implement actual API integration
    return new Promise<Quote>((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          date: '2024-02-15',
          items: [
            { name: 'Arm Chairs', size: 'Small', quantity: 2 },
            { name: '3 Seater Sofa', size: 'Large', quantity: 1 }
          ],
          source: '940 Strooman Key. Apt 334',
          destination: '123 New Address St.',
          distance: '50km',
          eta: '1:30 hr',
          price: '1,200.00',
          status: 'pending'
        });
      }, 1000);
    });
  },

  async createQuote(data: Partial<Quote>) {
    // TODO: Implement actual API integration
    return new Promise<Quote>((resolve) => {
      setTimeout(() => {
        resolve({
          id: `QT-${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
          items: data.items || [],
          source: data.source || '',
          destination: data.destination || '',
          distance: '50km',
          eta: '1:30 hr',
          price: '1,200.00',
          status: 'pending'
        });
      }, 1000);
    });
  }
};
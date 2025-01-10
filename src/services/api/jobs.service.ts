import apiClient from './client';
import { API_ENDPOINTS } from './config';
import type { Job } from '../../types/job';

export const jobsService = {
  async getJobs() {
    // TODO: Implement actual API integration
    return new Promise<Job[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'MOV-1234',
            status: 'in_progress',
            date: '2024-02-15',
            items: ['2x Arm Chairs', '1x 3 Seater Sofa'],
            crew: [
              {
                id: 'C1',
                name: 'John Driver',
                role: 'driver',
                phone: '+1234567890',
                photo: '/driver-photo.jpg'
              }
            ],
            timeline: [
              {
                id: 'T1',
                time: '08:00 AM',
                status: 'Order Confirmed',
                description: 'Your moving request has been confirmed',
                completed: true
              }
            ],
            tracking: {
              currentLocation: { lat: 40.7128, lng: -74.0060, address: 'Current Location' },
              source: { lat: 40.7282, lng: -73.7949, address: '940 Strooman Key. Apt 334' },
              destination: { lat: 40.7589, lng: -73.9851, address: '123 New Address St.' },
              estimatedArrival: '11:30 AM',
              distance: '5.2 miles',
              timeRemaining: '30 mins'
            }
          }
        ]);
      }, 1000);
    });
  },

  async getJobById(id: string) {
    // TODO: Implement actual API integration
    return new Promise<Job>((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          status: 'in_progress',
          date: '2024-02-15',
          items: ['2x Arm Chairs', '1x 3 Seater Sofa'],
          crew: [
            {
              id: 'C1',
              name: 'John Driver',
              role: 'driver',
              phone: '+1234567890',
              photo: '/driver-photo.jpg'
            }
          ],
          timeline: [
            {
              id: 'T1',
              time: '08:00 AM',
              status: 'Order Confirmed',
              description: 'Your moving request has been confirmed',
              completed: true
            }
          ],
          tracking: {
            currentLocation: { lat: 40.7128, lng: -74.0060, address: 'Current Location' },
            source: { lat: 40.7282, lng: -73.7949, address: '940 Strooman Key. Apt 334' },
            destination: { lat: 40.7589, lng: -73.9851, address: '123 New Address St.' },
            estimatedArrival: '11:30 AM',
            distance: '5.2 miles',
            timeRemaining: '30 mins'
          }
        });
      }, 1000);
    });
  },

  async trackJob(id: string) {
    // TODO: Implement actual API integration with real-time updates
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          currentLocation: { lat: 40.7128, lng: -74.0060, address: 'Current Location' },
          estimatedArrival: '11:30 AM',
          distance: '5.2 miles',
          timeRemaining: '30 mins'
        });
      }, 1000);
    });
  }
};
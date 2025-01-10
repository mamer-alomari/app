import { toast } from 'react-hot-toast';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = {
  handle(error: unknown, fallbackMessage = 'An unexpected error occurred'): void {
    console.error('Error caught:', error);

    if (error instanceof AppError) {
      toast.error(error.message);
      return;
    }

    if (error instanceof Error) {
      toast.error(error.message);
      return;
    }

    toast.error(fallbackMessage);
  },

  // Common error messages
  messages: {
    network: 'Network error. Please check your connection.',
    auth: 'Authentication failed. Please log in again.',
    permission: 'You do not have permission to perform this action.',
    notFound: 'The requested resource was not found.',
    validation: 'Please check your input and try again.',
    server: 'Server error. Please try again later.',
    payment: 'Payment processing failed. Please try again.',
    upload: 'File upload failed. Please try again.',
    camera: 'Camera access denied. Please check your permissions.',
  }
};
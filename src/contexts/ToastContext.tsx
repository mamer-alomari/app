import React, { createContext, useContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';

interface ToastContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showLoading: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showSuccess = (message: string) => toast.success(message, {
    duration: 2000,
    position: 'top-right',
  });
  
  const showError = (message: string) => toast.error(message, {
    duration: 3000,
    position: 'top-right',
  });
  
  const showLoading = (message: string) => toast.loading(message, {
    position: 'top-right',
  });

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showLoading }}>
      {children}
      <Toaster 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
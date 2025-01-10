import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const navigate = useNavigate();

  const handleReset = () => {
    resetErrorBoundary();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
            <p className="text-sm font-medium">{error.message}</p>
          </div>
          <div className="space-y-4">
            <button
              onClick={resetErrorBoundary}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900"
            >
              Try again
            </button>
            <button
              onClick={handleReset}
              className="w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
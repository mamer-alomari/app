import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 my-4">
      <p>{message}</p>
    </div>
  );
} 
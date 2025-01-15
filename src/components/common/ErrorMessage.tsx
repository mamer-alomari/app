import React from 'react';
import { Alert, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}; 
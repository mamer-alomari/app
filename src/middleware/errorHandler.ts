export function handleError(error: any) {
  console.error('Error:', error);
  
  if (error.code === 'PGRST301') {
    return 'Authentication required';
  }
  
  if (error.code === 'PGRST404') {
    return 'Resource not found';
  }
  
  return 'An unexpected error occurred';
} 
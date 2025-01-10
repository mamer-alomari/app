import { useState } from 'react';

interface ValidationRules {
  [key: string]: (value: any) => string | undefined;
}

export function useForm<T extends Record<string, any>>(
  initialState: T,
  validationRules: ValidationRules
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(validationRules).forEach(key => {
      const error = validationRules[key](formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    resetForm
  };
} 
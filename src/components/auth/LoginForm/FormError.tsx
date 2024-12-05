import React from 'react';

interface FormErrorProps {
  error: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
      {error}
    </div>
  );
};

export default FormError;
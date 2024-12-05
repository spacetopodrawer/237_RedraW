import React from 'react';
import { IconMail, IconLock, IconUser } from './icons';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  icon?: 'mail' | 'lock' | 'user';
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required,
  placeholder,
  icon
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'mail':
        return <IconMail className="h-5 w-5 text-gray-400" />;
      case 'lock':
        return <IconLock className="h-5 w-5 text-gray-400" />;
      case 'user':
        return <IconUser className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {renderIcon()}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            icon ? 'pl-10' : 'pl-3'
          } pr-3 py-2 border border-gray-300`}
          required={required}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default FormInput;
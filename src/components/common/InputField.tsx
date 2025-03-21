import React, { ChangeEvent, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

interface InputFieldProps {
  label?: string;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'checkbox';
  placeholder?: string;
  checked?: boolean;
  value?: string;
  onChange?: (name: string, value: string | boolean) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  name?: string;
  rows?: number;
  id?: string;
}

function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  checked,
  onChange,
  onBlur,
  onFocus,
  error,
  disabled = false,
  required = false,
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  name,
  rows,
  id,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const baseClasses =
    'border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed w-full';

  const variantClasses = {
    default: 'border-gray-300 focus:border-black focus:ring-gray-500 bg-white',
    outlined:
      'border-2 border-gray-300 focus:border-black focus:ring-gray-500 bg-white',
    filled:
      'border-gray-300 focus:border-black focus:ring-gray-500 bg-gray-50 focus:bg-white',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const errorClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : '';

  const inputClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    errorClasses,
    leftIcon ? 'pl-10' : '',
    rightIcon || type === 'password' ? 'pr-10' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  function onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!onChange) return;
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    onChange(name, updatedValue);
  }

  return (
    <div
      className={clsx('w-full', {
        'flex flex-row-reverse justify-end gap-2': type === 'checkbox',
      })}
    >
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{leftIcon}</div>
          </div>
        )}

        {rows ? (
          <textarea
            id={id || name}
            name={name}
            rows={rows}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.name, e.target.value)}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            className={inputClasses}
          />
        ) : (
          <input
            id={id || name}
            name={name}
            type={getInputType()}
            placeholder={placeholder}
            value={value}
            checked={checked}
            onChange={onInputChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            className={inputClasses}
          />
        )}

        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}

        {rightIcon && type !== 'password' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{rightIcon}</div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export { InputField };
export type { InputFieldProps }; 
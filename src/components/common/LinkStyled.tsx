import React from 'react';
import { Link } from 'react-router-dom';

interface LinkStyledProps {
  children: React.ReactNode;
  to: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const LinkStyled: React.FC<LinkStyledProps> = ({
  children,
  to,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-black text-white hover:bg-gray-900 focus:ring-gray-500 shadow-sm',
    secondary:
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm',
    outline:
      'border-2 border-black text-black hover:bg-gray-100 focus:ring-gray-500 bg-transparent',
    ghost: 'text-black hover:bg-gray-100 focus:ring-gray-500 bg-transparent',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className,
  ]
    .filter((item) => Boolean(item))
    .join(' ');

  return (
    <Link
      to={to}
      className={classes}
      style={{ pointerEvents: disabled || loading ? 'none' : 'auto' }}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </Link>
  );
};

export { LinkStyled };
export type { LinkStyledProps };

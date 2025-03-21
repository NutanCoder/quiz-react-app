import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 max-w-3xl mx-auto">
      {children}
    </div>
  );
};

export { Card };
export type { CardProps }; 
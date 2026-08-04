'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-red-600 text-white hover:from-blue-500 hover:to-red-500 shadow-blue-900/30 hover:scale-[1.02]',
    secondary: 'bg-slate-800 text-blue-400 border border-blue-500/30 hover:bg-slate-700 hover:text-blue-300',
    outline: 'border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
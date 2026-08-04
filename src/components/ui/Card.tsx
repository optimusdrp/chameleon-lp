'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20 ${className}`}>
      {children}
    </div>
  );
};
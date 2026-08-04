'use client';

import React from 'react';
import { footerData } from '@/data/footerData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-red-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <div>
            <p className="text-white font-bold">{footerData.companyName}</p>
            <p className="text-xs">{footerData.rights}</p>
          </div>
        </div>

        <div className="text-center md:text-right font-mono text-xs">
          {footerData.stackNotice}
        </div>

      </div>
    </footer>
  );
};
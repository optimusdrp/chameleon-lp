'use client';

import React from 'react';
import { Button } from './ui/Button';
import { heroData } from '@/data/heroData';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-400 text-sm mb-6">
          {heroData.badge}
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
          {heroData.headline.split('.')[0]}. <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-red-500 bg-clip-text text-transparent">
            {heroData.headline.split('.')[1]}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          {heroData.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contato" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto text-base">
              {heroData.primaryCta}
            </Button>
          </a>
          <a href="#simulador" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto text-base">
              {heroData.secondaryCta}
            </Button>
          </a>
        </div>

      </div>
    </section>
  );
};
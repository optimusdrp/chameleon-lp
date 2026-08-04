'use client';

import React from 'react';
import { techStackData } from '@/data/techStackData';
import { Card } from './ui/Card';

export const TechStack: React.FC = () => {
  return (
    <section id="stack" className="py-24 bg-slate-900/30 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-500 font-mono text-sm uppercase tracking-wider mb-3">{techStackData.subtitle}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            {techStackData.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStackData.items.map((tech, idx) => (
            <Card key={idx} className="hover:border-blue-500/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-white">{tech.name}</h4>
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-blue-400 font-mono">
                  {tech.category}
                </span>
              </div>
              <p className="text-sm text-slate-400">{tech.description}</p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
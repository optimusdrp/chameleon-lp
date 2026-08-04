'use client';

import React from 'react';
import { solutionsData } from '@/data/solutionsData';
import { Card } from './ui/Card';
import { Layout, Cpu, Bot } from 'lucide-react';

export const Solutions: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-8 h-8 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-red-500" />;
      case 'Bot': return <Bot className="w-8 h-8 text-indigo-400" />;
      default: return <Layout className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <section id="solucoes" className="py-24 bg-slate-900/50 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-500 font-mono text-sm uppercase tracking-wider mb-3">{solutionsData.subtitle}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            {solutionsData.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutionsData.items.map((solution) => (
            <Card key={solution.id} className="group hover:-translate-y-1">
              <div className="mb-6 p-4 w-fit rounded-xl bg-slate-800/80 border border-slate-700/50 group-hover:border-blue-500/40 transition-colors">
                {getIcon(solution.iconName)}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{solution.title}</h4>
              <p className="text-slate-400 leading-relaxed">{solution.description}</p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
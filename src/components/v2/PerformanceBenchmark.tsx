'use client';

import React, { useState } from 'react';
import { benchmarkData } from '@/data/v2/benchmarkData';

export const PerformanceBenchmark: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'optimus' | 'legacy'>('optimus');

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30">
            {benchmarkData.sectionTitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
            {benchmarkData.heading}
          </h2>
          <p className="text-slate-400 text-sm md:text-base">{benchmarkData.description}</p>
        </div>

        {/* Tabs Switcher */}
        <div className="flex justify-center mb-10">
          <div className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-2">
            <button
              onClick={() => setActiveTab('optimus')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'optimus'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🚀 Stack Optimus DRP
            </button>
            <button
              onClick={() => setActiveTab('legacy')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'legacy'
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚠️ Sistema Legado Tradicional
            </button>
          </div>
        </div>

        {/* Metrics Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <span className="text-xs text-slate-400 font-mono">TEMPO DE CARREGAMENTO</span>
            <p className={`text-3xl font-extrabold mt-2 ${activeTab === 'optimus' ? 'text-emerald-400' : 'text-amber-500'}`}>
              {activeTab === 'optimus' ? benchmarkData.metrics.optimus.loadTime : benchmarkData.metrics.legacy.loadTime}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <span className="text-xs text-slate-400 font-mono">HORAS ECONOMIZADAS / MÊS</span>
            <p className={`text-3xl font-extrabold mt-2 ${activeTab === 'optimus' ? 'text-cyan-400' : 'text-amber-500'}`}>
              {activeTab === 'optimus' ? benchmarkData.metrics.optimus.hoursSavedPerMonth : benchmarkData.metrics.legacy.hoursSavedPerMonth}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <span className="text-xs text-slate-400 font-mono">LIGHTHOUSE SCORE</span>
            <p className={`text-3xl font-extrabold mt-2 ${activeTab === 'optimus' ? 'text-emerald-400' : 'text-red-500'}`}>
              {activeTab === 'optimus' ? benchmarkData.metrics.optimus.lighthouseScore : benchmarkData.metrics.legacy.lighthouseScore}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <span className="text-xs text-slate-400 font-mono">INTEGRAÇÃO DE IA</span>
            <p className={`text-lg font-bold mt-2 ${activeTab === 'optimus' ? 'text-indigo-400' : 'text-slate-500'}`}>
              {activeTab === 'optimus' ? benchmarkData.metrics.optimus.aiIntegration : benchmarkData.metrics.legacy.aiIntegration}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
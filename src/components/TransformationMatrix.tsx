'use client';

import React, { useState } from 'react';
import { simulatorData } from '@/data/simulatorData';
import { Button } from './ui/Button';

export const TransformationMatrix: React.FC = () => {
  const [selectedBottleneck, setSelectedBottleneck] = useState(simulatorData.bottlenecks[0]);
  const [selectedPower, setSelectedPower] = useState(simulatorData.powerLevels[1]);
  const [simulated, setSimulated] = useState(false);

  const handleRunSimulation = () => setSimulated(true);

  return (
    <section id="simulador" className="py-24 bg-slate-950 relative">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-500 font-mono text-sm uppercase tracking-wider mb-3">{simulatorData.subtitle}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {simulatorData.title}
          </h3>
          <p className="text-slate-400">{simulatorData.description}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          <div className="mb-8">
            <label className="block text-white font-semibold mb-4 text-lg">
              {simulatorData.step1Label}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {simulatorData.bottlenecks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedBottleneck(item); setSimulated(false); }}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedBottleneck.id === item.id
                      ? 'bg-blue-950/40 border-blue-500 text-white shadow-lg shadow-blue-950/50'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="font-medium text-sm">{item.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-white font-semibold mb-4 text-lg">
              {simulatorData.step2Label}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simulatorData.powerLevels.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedPower(item); setSimulated(false); }}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedPower.id === item.id
                      ? 'bg-red-950/30 border-red-500 text-white shadow-lg shadow-red-950/50'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold text-white mb-1">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <Button variant="primary" onClick={handleRunSimulation} className="mx-auto">
              {simulatorData.processButton}
            </Button>
          </div>

          {simulated && (
            <div className="mt-8 p-6 rounded-2xl bg-slate-950 border border-blue-500/40 animate-fadeIn">
              <h4 className="text-blue-400 font-mono text-sm uppercase tracking-wider mb-2">
                {simulatorData.resultHeading}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-white font-bold text-lg mb-2">{simulatorData.impactLabel}</p>
                  <p className="text-3xl font-extrabold text-emerald-400 mb-2">
                    +{selectedBottleneck.impactScore}% de Eficiência
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs font-mono text-slate-400 mb-2">{simulatorData.stackLabel}</p>
                  <ul className="space-y-1 mb-4">
                    {selectedBottleneck.recommendedStack.map((tech, idx) => (
                      <li key={idx} className="text-sm text-blue-300 flex items-center gap-2">
                        <span>✓</span> {tech}
                      </li>
                    ))}
                  </ul>
                  <a href="#contato">
                    <Button variant="outline" className="w-full text-xs py-2">
                      {simulatorData.applyButton}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
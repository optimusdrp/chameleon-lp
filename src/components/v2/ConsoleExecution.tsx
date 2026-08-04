'use client';

import React, { useState } from 'react';
import { consoleData } from '@/data/v2/consoleData';
import { Terminal, Play, RotateCcw } from 'lucide-react';

export const ConsoleExecution: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(consoleData.logsInitial);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setLogs(consoleData.logsInitial);

    consoleData.logsSuccess.forEach((log, index) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, log]);
        if (index === consoleData.logsSuccess.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 400);
    });
  };

  const setMessages = (fn: (prev: string[]) => string[]) => {
    setLogs(fn);
  };

  const handleReset = () => {
    setLogs(consoleData.logsInitial);
    setIsRunning(false);
  };

  return (
    <section className="py-20 bg-slate-950/90 border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
            {consoleData.sectionTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-3">
            {consoleData.heading}
          </h2>
          <p className="text-slate-400 text-sm">{consoleData.description}</p>
        </div>

        {/* Terminal Box */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
          
          {/* Header Bar */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-slate-400 text-xs ml-2 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> optimus-executor.ts
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isRunning ? "Executando..." : consoleData.buttonRun}</span>
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Log Window */}
          <div className="p-6 h-64 overflow-y-auto space-y-2 bg-slate-950/90 text-slate-300">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-2 animate-fadeIn">
                <span className="text-slate-600">&gt;</span>
                <span className={log.includes("SUCCESS") ? "text-emerald-400 font-bold" : "text-slate-300"}>
                  {log}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
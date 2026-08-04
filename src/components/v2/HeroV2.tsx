'use client';

import React from 'react';
import { heroData } from '@/data/heroData';
import { Bot, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const HeroV2: React.FC = () => {
  return (
    <section className="relative pt-40 pb-28 min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Visual Emerald Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Lado Esquerdo: Textos */}
        <div className="lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>ARQUITETURA DE IA & NEXT.JS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Sistemas Autônomos. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Infraestrutura do Futuro.
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
            {heroData.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#contato">
              <button className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center gap-2">
                <span>Solicitar Diagnóstico</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>

        {/* Lado Direito: Hologram Floating Card */}
        <div className="lg:col-span-5">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl relative group">
            <div className="absolute -top-4 -right-4 p-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold shadow-lg">
              <Bot className="w-6 h-6" />
            </div>

            <span className="text-xs font-mono text-emerald-400">OPTIMUS CORE AGENT</span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-4">Status do Sistema: Ativo</h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 flex justify-between">
                <span>Motor de IA:</span>
                <span className="text-emerald-400">GPT-4o / LLM Custom</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 flex justify-between">
                <span>Latência Média:</span>
                <span className="text-cyan-400">12ms</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 flex justify-between">
                <span>Uptime:</span>
                <span className="text-emerald-400">99.99%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
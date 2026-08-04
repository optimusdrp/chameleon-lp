'use client';

import React, { useState } from 'react';
import { navigationData } from '@/data/navigationData';
import { Sparkles, Menu, X } from 'lucide-react';

export const NavbarV2: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#top' || href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 90; // Offset para compensar a navbar flutuante
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <div className="bg-slate-900/70 backdrop-blur-2xl border border-emerald-500/20 rounded-full px-5 md:px-6 h-16 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-extrabold text-sm shadow-md shadow-emerald-500/30">
            O
          </div>
          <span className="text-white font-extrabold tracking-wider text-xs md:text-sm">
            {navigationData.brand.name}
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
          <a
            href="#top"
            onClick={(e) => handleScrollToSection(e, '#top')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Início
          </a>
          <a
            href="#workflow"
            onClick={(e) => handleScrollToSection(e, '#workflow')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Workflow IA
          </a>
          <a
            href="#console"
            onClick={(e) => handleScrollToSection(e, '#console')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Console API
          </a>
          <a
            href="#benchmark"
            onClick={(e) => handleScrollToSection(e, '#benchmark')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Benchmark
          </a>
        </nav>

        {/* Desktop CTA & Mobile Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <a href="#contato" onClick={(e) => handleScrollToSection(e, '#contato')}>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Transformar Agora</span>
              </button>
            </a>
          </div>

          <button
            onClick={handleToggleMenu}
            className="md:hidden p-2 rounded-full bg-slate-950/80 border border-emerald-500/30 text-emerald-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Alternar Menu Mobile"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-slate-950/95 border border-emerald-500/30 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl animate-fadeIn">
          
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Optimus Core: 100% Operacional</span>
          </div>

          <nav className="flex flex-col gap-4 text-center text-sm font-medium text-slate-300 mb-6">
            <a
              href="#top"
              onClick={(e) => handleScrollToSection(e, '#top')}
              className="hover:text-emerald-400 transition-colors py-2 border-b border-slate-900 cursor-pointer"
            >
              Início
            </a>
            <a
              href="#workflow"
              onClick={(e) => handleScrollToSection(e, '#workflow')}
              className="hover:text-emerald-400 transition-colors py-2 border-b border-slate-900 cursor-pointer"
            >
              Workflow IA
            </a>
            <a
              href="#console"
              onClick={(e) => handleScrollToSection(e, '#console')}
              className="hover:text-emerald-400 transition-colors py-2 border-b border-slate-900 cursor-pointer"
            >
              Console API
            </a>
            <a
              href="#benchmark"
              onClick={(e) => handleScrollToSection(e, '#benchmark')}
              className="hover:text-emerald-400 transition-colors py-2 border-b border-slate-900 cursor-pointer"
            >
              Benchmark
            </a>
          </nav>

          <a href="#contato" onClick={(e) => handleScrollToSection(e, '#contato')} className="block w-full">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer">
              <Sparkles className="w-4 h-4" />
              <span>Transformar Agora</span>
            </button>
          </a>

        </div>
      )}
    </header>
  );
};
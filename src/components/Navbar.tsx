'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Menu, X } from 'lucide-react';
import { navigationData } from '@/data/navigationData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleCloseMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-red-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <div>
            <h1 className="text-white font-bold tracking-wider text-sm md:text-lg">{navigationData.brand.name}</h1>
            <p className="text-[10px] md:text-xs text-slate-400">{navigationData.brand.slogan}</p>
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {navigationData.statusBadge}
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm text-slate-300 font-medium">
          {navigationData.links.map((link, idx) => (
            <a key={idx} href={link.href} className="hover:text-blue-400 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <a href="#contato">
              <Button variant="primary" className="text-sm py-2 px-4">
                {navigationData.ctaButton}
              </Button>
            </a>
          </div>

          <button
            onClick={handleToggleMenu}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-6 py-8 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {navigationData.statusBadge}
          </div>

          <nav className="flex flex-col gap-6 text-center text-base font-medium text-slate-300 mb-8">
            {navigationData.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={handleCloseMenu}
                className="hover:text-blue-400 transition-colors py-2 border-b border-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a href="#contato" onClick={handleCloseMenu} className="w-full">
              <Button variant="primary" className="w-full text-sm py-3">
                {navigationData.ctaButton}
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
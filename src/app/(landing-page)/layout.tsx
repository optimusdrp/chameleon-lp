import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { NavbarV2 } from '@/components/v2/NavbarV2';
import React from 'react';

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      <NavbarV2 />
      {children}
      <Footer />
    </div>
  );
}
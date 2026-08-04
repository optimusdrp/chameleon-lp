'use client';

import React, { useState } from 'react';
import { contactData } from '@/data/contactData';
import { Sparkles, CheckCircle2, Send, Loader2 } from 'lucide-react';

export const ContactFormV2: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: contactData.options[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao enviar mensagem.');
      }

      setSubmitted(true);
    } catch (error: any) {
      setErrorMessage(error.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
            {contactData.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
            {contactData.title}
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">{contactData.description}</p>
        </div>

        <div className="p-8 md:p-12 rounded-3xl bg-slate-900/60 border border-emerald-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          {submitted ? (
            <div className="text-center py-16 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-950 border border-emerald-500/50 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{contactData.successMessage.title}</h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto">{contactData.successMessage.description}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                    {contactData.fields.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder={contactData.fields.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                    {contactData.fields.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder={contactData.fields.emailPlaceholder}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                    {contactData.fields.company}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder={contactData.fields.companyPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                    {contactData.fields.projectType}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                  >
                    {contactData.options.map((opt, idx) => (
                      <option key={idx} value={opt} className="bg-slate-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-emerald-500/20 hover:opacity-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando Mensagem...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{contactData.submitButton}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
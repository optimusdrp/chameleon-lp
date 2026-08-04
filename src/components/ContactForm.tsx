'use client';

import React, { useState } from 'react';
import { contactData } from '@/data/contactData';
import { Button } from './ui/Button';

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: contactData.options[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contato" className="py-24 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-mono text-sm uppercase tracking-wider mb-3">{contactData.subtitle}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {contactData.title}
          </h3>
          <p className="text-slate-400">{contactData.description}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{contactData.successMessage.title}</h4>
              <p className="text-slate-300">{contactData.successMessage.description}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{contactData.fields.name}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder={contactData.fields.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{contactData.fields.email}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder={contactData.fields.emailPlaceholder}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{contactData.fields.company}</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder={contactData.fields.companyPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{contactData.fields.projectType}</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {contactData.options.map((opt, idx) => (
                      <option key={idx}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="primary" type="submit" className="w-full py-4 text-base">
                  {contactData.submitButton}
                </Button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
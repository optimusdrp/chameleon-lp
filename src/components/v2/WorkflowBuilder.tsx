'use client';

import React, { useState } from 'react';
import { Cpu, CheckCircle2, Loader2, X, ShieldCheck, Terminal, Send, MessageSquare, ExternalLink, FileText, Database } from 'lucide-react';
import { workflowData } from '@/data/v2/workflowData';

export const WorkflowBuilderV2: React.FC = () => {
  const allOptions = workflowData.options?.length 
    ? [...workflowData.options, 'Automação de Leads & Telegram'] 
    : ['Processamento Cognitivo de Documentos', 'Automação de Leads & Telegram'];

  const [selectedOption, setSelectedOption] = useState<string>('Processamento Cognitivo de Documentos');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<boolean>(true);
  const [executionLog, setExecutionLog] = useState<string>('Inicializando pipeline...');
  const [telegramUrl, setTelegramUrl] = useState<string | null>(null);
  const [cognitiveResult, setCognitiveResult] = useState<any>(null);

  // Formulário completo para Lead / Telegram
  const [leadInput, setLeadInput] = useState({
    name: 'Vitor Goldberg',
    email: 'vitor@optimusdrp.com',
    company: 'Optimus Dynamic Corp',
    phone: '+55 (51) 991507327',
  });

  // Formulário específico para Processamento Cognitivo de Documentos
  const [documentInput, setDocumentInput] = useState({
    documentName: 'Fatura_Servicos_Cloud_2026.pdf',
    documentType: 'Fatura / Boleto',
    contentSnippet: 'Fatura ref. Hospedagem de Vercel & Processamento Prismatic Next.js 15. Valor total: R$ 4.850,00 Vencimento: 10/05/2026.',
  });

  const isCognitiveModule = selectedOption.includes('Processamento Cognitivo');

  const handleExecuteWorkflow = async () => {
    setIsModalOpen(true);
    setLoadingStep(true);
    setTelegramUrl(null);
    setCognitiveResult(null);

    if (isCognitiveModule) {
      setExecutionLog(`Enviando documento "${documentInput.documentName}" para o motor cognitivo OCR/IA...`);
      try {
        const response = await fetch('/api/workflow/document-cognitive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...documentInput,
            projectType: selectedOption,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Erro na análise cognitiva.');

        setCognitiveResult(data.data);
        setExecutionLog(`Sucesso! Documento analisado com ${data.data.confidenceScore * 100}% de confiabilidade.`);
      } catch (error: any) {
        setExecutionLog(`Erro na Análise: ${error.message}`);
      } finally {
        setLoadingStep(false);
      }
    } else {
      setExecutionLog(`Processando lead (${leadInput.phone}) e preparando canal do Telegram...`);
      try {
        const response = await fetch('/api/workflow/lead-telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...leadInput,
            projectType: selectedOption,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Falha ao executar o fluxo automatizado.');

        if (data.telegramLink) setTelegramUrl(data.telegramLink);
        setExecutionLog(`Sucesso! Alerta administrativo enviado e link direto gerado para ${leadInput.name}.`);
      } catch (error: any) {
        setExecutionLog(`Erro na Execução: ${error.message}`);
      } finally {
        setLoadingStep(false);
      }
    }
  };

  return (
    <section id="workflow" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
            ENGINE DINÂMICO V2
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
            Workflow Builder com IA
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Selecione uma arquitetura e configure seu fluxo automatizado em tempo real.
          </p>
        </div>

        <div className="p-8 md:p-12 rounded-3xl bg-slate-900/60 border border-emerald-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {allOptions.map((opt: string, idx: number) => {
              const isSelected = selectedOption === opt;
              const isTelegram = opt.includes('Telegram');
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(opt)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    {isTelegram ? (
                      <MessageSquare className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    ) : (
                      <FileText className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                    )}
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      Módulo 0{idx + 1}
                    </span>
                  </div>
                  <h4 className={`font-bold text-sm md:text-base ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {opt}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Renderização dinâmica dos inputs conforme o card selecionado */}
          {isCognitiveModule ? (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 mb-6">
              <p className="text-xs font-mono text-emerald-400 uppercase font-bold">Parâmetros do Documento Cognitivo:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nome do Documento / Arquivo</label>
                  <input
                    type="text"
                    value={documentInput.documentName}
                    onChange={(e) => setDocumentInput({ ...documentInput, documentName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Tipo do Documento</label>
                  <input
                    type="text"
                    value={documentInput.documentType}
                    onChange={(e) => setDocumentInput({ ...documentInput, documentType: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Texto / Snippet Extraído para Análise</label>
                <textarea
                  rows={2}
                  value={documentInput.contentSnippet}
                  onChange={(e) => setDocumentInput({ ...documentInput, contentSnippet: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 mb-6">
              <p className="text-xs font-mono text-cyan-400 uppercase font-bold">Parâmetros completos do Lead:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nome do Lead</label>
                  <input
                    type="text"
                    value={leadInput.name}
                    onChange={(e) => setLeadInput({ ...leadInput, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">E-mail</label>
                  <input
                    type="text"
                    value={leadInput.email}
                    onChange={(e) => setLeadInput({ ...leadInput, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Empresa</label>
                  <input
                    type="text"
                    value={leadInput.company}
                    onChange={(e) => setLeadInput({ ...leadInput, company: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Telefone</label>
                  <input
                    type="text"
                    value={leadInput.phone}
                    onChange={(e) => setLeadInput({ ...leadInput, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 block mb-1">Módulo Ativo Selecionado:</span>
              <span className="text-white font-bold text-sm md:text-base">{selectedOption}</span>
            </div>

            <button
              onClick={handleExecuteWorkflow}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                isCognitiveModule 
                  ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 shadow-emerald-500/20' 
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-90 shadow-cyan-500/20'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isCognitiveModule ? 'Executar Teste Cognitivo' : 'Configurar e Disparar Telegram'}</span>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-950 border border-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm md:text-base font-mono">Orquestrador Optimus v2.4</h3>
                <p className="text-xs text-emerald-400 font-mono">{selectedOption}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-xl border bg-slate-950 border-slate-800 text-white">
                {loadingStep ? (
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-mono font-bold text-emerald-400">
                    {loadingStep ? 'Processando Automação...' : 'Concluído com Sucesso'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{executionLog}</p>
                </div>
              </div>

              {/* Exibição dos resultados do Processamento Cognitivo */}
              {!loadingStep && isCognitiveModule && cognitiveResult && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-slate-200 space-y-2">
                  <p className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" /> Entidades Extraídas por IA:
                  </p>
                  <div className="text-xs space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-slate-300">
                    <p><strong className="text-emerald-400">Documento:</strong> {cognitiveResult.documentName}</p>
                    <p><strong className="text-emerald-400">Tipo:</strong> {cognitiveResult.documentType}</p>
                    <p><strong className="text-emerald-400">Nº Identificador:</strong> {cognitiveResult.extractedEntities.documentNumber}</p>
                    <p><strong className="text-emerald-400">Emissor:</strong> {cognitiveResult.extractedEntities.issuerName}</p>
                    <p><strong className="text-emerald-400">Valor Identificado:</strong> {cognitiveResult.extractedEntities.totalAmount}</p>
                    <p><strong className="text-emerald-400">Confiabilidade:</strong> {(cognitiveResult.confidenceScore * 100).toFixed(0)}%</p>
                  </div>
                </div>
              )}

              {/* Exibição do link do Telegram caso seja o módulo ativo */}
              {!loadingStep && !isCognitiveModule && telegramUrl && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-slate-200">
                  <p className="text-xs font-mono text-cyan-400 mb-2 uppercase font-bold">Ação Necessária:</p>
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-cyan-400 text-slate-950 font-extrabold text-xs tracking-wide transition-all flex items-center justify-center gap-2 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer"
                  >
                    <span>Abrir Bot no Telegram Web</span>
                    <ExternalLink className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                disabled={loadingStep}
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/40 font-bold text-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Fechar Painel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
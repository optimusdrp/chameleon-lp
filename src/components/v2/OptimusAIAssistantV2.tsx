"use client";

import React, { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function OptimusAIAssistantV2() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Como posso ajudar o Optimus Dynamic hoje?",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    // Adiciona a mensagem do usuário e simula uma resposta simples
    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Recebi sua mensagem: "${input}". (Modo simulado sem IA ativa)`,
      },
    ]);

    setInput("");
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
      {/* Cabeçalho */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
        <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
          Optimus AI Assistant v2
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Interface simplificada (sem SDKs externos)
        </p>
      </div>

      {/* Container de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de Envio */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
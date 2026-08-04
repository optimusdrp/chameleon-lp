export interface BottleneckOption {
  id: string;
  label: string;
  impactScore: number;
  recommendedStack: string[];
}

export interface PowerLevelOption {
  id: string;
  title: string;
  description: string;
}

export const simulatorData = {
  subtitle: "Simulador Interativo",
  title: "Matriz de Transformação: Simule a Evolução do Seu Negócio",
  description: "Configure seus gargalos atuais e descubra a stack ideal gerada pela nossa IA.",
  step1Label: "1. Selecione o gargalo que está travando o seu crescimento:",
  step2Label: "2. Defina o nível de potência desejado para a automação:",
  processButton: "⚡ Processar Diagnóstico Optimus",
  resultHeading: "[Resultado da Simulação]",
  impactLabel: "Impacto Operacional Estimado:",
  stackLabel: "STACK RECOMENDADA:",
  applyButton: "Aplicar Esta Solução na Minha Empresa",
  bottlenecks: [
    {
      id: 'slow-support',
      label: 'Atendimento ao cliente lento e manual',
      impactScore: 85,
      recommendedStack: ['Agentes de IA', 'Automação de Webhooks', 'Next.js Dashboard'],
    },
    {
      id: 'messy-sheets',
      label: 'Processos internos cheios de planilhas desconectadas',
      impactScore: 90,
      recommendedStack: ['Automação de Processos', 'Integração de APIs', 'Banco de Dados SQL'],
    },
    {
      id: 'legacy-system',
      label: 'Falta de um sistema web moderno e escalável',
      impactScore: 95,
      recommendedStack: ['Next.js App Router', 'TypeScript', 'Tailwind CSS & Vercel'],
    },
  ] as BottleneckOption[],
  powerLevels: [
    {
      id: 'basic',
      title: 'Automação Básica (APIs & Integrações)',
      description: 'Conexão direta entre ferramentas existentes para eliminar tarefas repetitivas.',
    },
    {
      id: 'advanced',
      title: 'Ecossistema Completo com IA Autônoma',
      description: 'Sistemas web de alta performance integrados com agentes de inteligência artificial de ponta.',
    },
  ] as PowerLevelOption[],
};
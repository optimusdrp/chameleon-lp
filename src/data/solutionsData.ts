export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const solutionsData = {
  subtitle: "O Arsenal Optimus",
  title: "Poder e Precisão em Cada Linha de Código",
  items: [
    {
      id: 'web-apps',
      title: 'Sistemas & Web Apps',
      description: 'Arquitetura moderna em Next.js, performance extrema e interfaces responsivas construídas para escalar o seu negócio sem limites.',
      iconName: 'Layout',
    },
    {
      id: 'automation',
      title: 'Automação de Processos',
      description: 'Elimine trabalhos manuais repetitivos com integrações de APIs inteligentes e fluxos automatizados que rodam 24/7.',
      iconName: 'Cpu',
    },
    {
      id: 'ai-agents',
      title: 'Agentes de IA Personalizados',
      description: 'Assistentes inteligentes treinados para resolver problemas específicos, otimizar o atendimento e tomar decisões estratégicas.',
      iconName: 'Bot',
    },
  ] as SolutionItem[],
};
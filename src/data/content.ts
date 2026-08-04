import { SolutionItem, BottleneckOption, PowerLevelOption, TechItem } from '@/types';

export const solutionsData: SolutionItem[] = [
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
];

export const bottleneckOptions: BottleneckOption[] = [
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
];

export const powerLevelOptions: PowerLevelOption[] = [
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
];

export const techStackData: TechItem[] = [
  { name: 'Next.js', category: 'Frontend/Fullstack', description: 'Framework React para renderização híbrida e SEO avançado.' },
  { name: 'TypeScript', category: 'Linguagem', description: 'Tipagem estática rigorosa para códigos seguros e escaláveis.' },
  { name: 'Tailwind CSS', category: 'Estilização', description: 'Design system utilitário para interfaces modernas e responsivas.' },
  { name: 'Prisma / SQL', category: 'Database', description: 'Gerenciamento de dados seguro e de alta performance.' },
  { name: 'OpenAI / LLMs', category: 'Inteligência Artificial', description: 'Criação de agentes conversacionais e analíticos sob medida.' },
  { name: 'Vercel', category: 'Cloud & Hosting', description: 'Infraestrutura global com deploy contínuo e baixa latência.' },
];
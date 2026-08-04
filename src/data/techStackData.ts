export interface TechItem {
  name: string;
  category: string;
  description: string;
}

export const techStackData = {
  subtitle: "Core Tecnológico",
  title: "A Potência por Trás dos Nossos Sistemas",
  items: [
    { name: 'Next.js', category: 'Frontend/Fullstack', description: 'Framework React para renderização híbrida e SEO avançado.' },
    { name: 'TypeScript', category: 'Linguagem', description: 'Tipagem estática rigorosa para códigos seguros e escaláveis.' },
    { name: 'Tailwind CSS', category: 'Estilização', description: 'Design system utilitário para interfaces modernas e responsivas.' },
    { name: 'Prisma / SQL', category: 'Database', description: 'Gerenciamento de dados seguro e de alta performance.' },
    { name: 'OpenAI / LLMs', category: 'Inteligência Artificial', description: 'Criação de agentes conversacionais e analíticos sob medida.' },
    { name: 'Vercel', category: 'Cloud & Hosting', description: 'Infraestrutura global com deploy contínuo e baixa latência.' },
  ] as TechItem[],
};
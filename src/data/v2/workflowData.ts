export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'ai' | 'database' | 'action';
  title: string;
  subtitle: string;
  status: 'active' | 'processing' | 'idle';
  detail: string;
}

export const workflowData = {
  subtitle: "ENGINE DINÂMICO",
  title: "Workflow Builder com IA",
  sectionTitle: "AUTOMAÇÃO EM TEMPO REAL",
  heading: "Pipeline de Agentes de IA & Automação de Processos",
  description: "Selecione uma opção de arquitetura e configure seu fluxo automatizado em segundos.",
  options: [
    "Automação de Leads & WhatsApp",
    "Processamento Cognitivo de Documentos",
    "Sincronização ERP & Prisma DB"
  ],
  nodes: [
    {
      id: 'node-1',
      type: 'trigger',
      title: '1. Event Trigger',
      subtitle: 'Entrada de Dados / Webhook',
      status: 'active',
      detail: 'Captura requisições de formulários, ERPs ou WhatsApp instantaneamente via Webhooks de alta velocidade.',
    },
    {
      id: 'node-2',
      type: 'ai',
      title: '2. Agente de IA',
      subtitle: 'Processamento Cognitivo',
      status: 'processing',
      detail: 'A IA analisa a intenção, extrai dados relevantes e toma decisões com base no modelo customizado da sua empresa.',
    },
    {
      id: 'node-3',
      type: 'database',
      title: '3. Prisma / Database',
      subtitle: 'Persistência de Dados',
      status: 'idle',
      detail: 'Gravação e consulta em banco de dados SQL estruturado com validação estrita em TypeScript.',
    },
    {
      id: 'node-4',
      type: 'action',
      title: '4. Action Dispatch',
      subtitle: 'Execução Automática',
      status: 'idle',
      detail: 'Envio de e-mails, atualização de CRM, emissão de cobranças Pix e notificações automáticas.',
    },
  ] as WorkflowNode[],
};
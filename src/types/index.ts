// ==========================================
// OPTIMUS DRP - Definições de Tipos Globais
// ==========================================

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

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

export interface TechItem {
  name: string;
  category: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
}
export interface NavItem {
  label: string;
  href: string;
}

export const navigationData = {
  brand: {
    name: "OPTIMUS DRP",
    slogan: "Dynamic Responsive Platforms",
  },
  statusBadge: "Matriz Optimus: 100% Operacional",
  links: [
    { label: "Soluções", href: "#solucoes" },
    { label: "Matriz de Transformação", href: "#simulador" },
    { label: "Tech Stack", href: "#stack" },
  ] as NavItem[],
  ctaButton: "Iniciar Transformação",
};
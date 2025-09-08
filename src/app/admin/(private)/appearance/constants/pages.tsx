import {
  PanelBottomDashed,
  PanelTopDashed,
  PanelTopBottomDashed,
} from "lucide-react";

export const DEFAULT_COMPONENT_PAGES: {
  id: "header" | "home" | "search" | "vehicle" | "footer";
  icon: React.ReactNode;
  label: string;
  url: string;
  description: string;
  shared: boolean;
}[] = [
  {
    id: "header",
    icon: <PanelTopDashed />,
    label: "Cabeçalho",
    url: "/admin/appearance/header",
    description: "Personalize o cabeçalho do site.",
    shared: true,
  },
  {
    id: "footer",
    icon: <PanelBottomDashed />,
    label: "Rodapé",
    url: "/admin/appearance/footer",
    description: "Personalize o rodapé do site.",
    shared: true,
  },
  {
    id: "home",
    icon: <PanelTopBottomDashed />,
    label: "Página Inicial",
    url: "/admin/appearance/home",
    description: "Personalize a página inicial do site.",
    shared: false,
  },
  {
    id: "search",
    icon: <PanelTopBottomDashed />,
    label: "Página de Busca",
    url: "/admin/appearance/search",
    description: "Personalize a página de listagem e busca de veículos.",
    shared: false,
  },
  {
    id: "vehicle",
    icon: <PanelTopBottomDashed />,
    label: "Página do Veículo",
    url: "/admin/appearance/vehicle",
    description: "Personalize a página de detalhes do veículo.",
    shared: false,
  },
];

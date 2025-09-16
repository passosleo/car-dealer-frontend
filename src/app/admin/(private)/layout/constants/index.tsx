import {
  PanelBottomDashedIcon,
  PanelTopBottomDashedIcon,
  PanelTopDashedIcon,
} from "lucide-react";
import { JSX } from "react";

export const RESPONSE_TO_SCOPE: Record<
  string,
  "header" | "footer" | "home-page" | "search-page" | "vehicle-page"
> = {
  header: "header",
  footer: "footer",
  homePage: "home-page",
  searchPage: "search-page",
  vehiclePage: "vehicle-page",
};

export const ICON_MAP: Record<
  "header" | "footer" | "home-page" | "search-page" | "vehicle-page",
  JSX.Element
> = {
  header: <PanelTopDashedIcon />,
  footer: <PanelBottomDashedIcon />,
  "home-page": <PanelTopBottomDashedIcon />,
  "search-page": <PanelTopBottomDashedIcon />,
  "vehicle-page": <PanelTopBottomDashedIcon />,
};

export const SCOPE_LABEL: Record<keyof typeof ICON_MAP, string> = {
  header: "Cabeçalho",
  footer: "Rodapé",
  "home-page": "Página Inicial",
  "search-page": "Página de Busca",
  "vehicle-page": "Página do Veículo",
};

export const SCOPE_DESCRIPTION: Record<keyof typeof ICON_MAP, string> = {
  header: "Elementos comuns de topo exibidos em todo o site.",
  footer: "Elementos comuns de rodapé exibidos em todo o site.",
  "home-page": "Componentes específicos da página inicial.",
  "search-page": "Componentes específicos da listagem/busca.",
  "vehicle-page": "Componentes específicos da página do veículo.",
};

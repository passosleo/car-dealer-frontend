import { LayoutComponentScope } from "@/types/layout-component";
import {
  PanelBottomDashedIcon,
  PanelTopBottomDashedIcon,
  PanelTopDashedIcon,
} from "lucide-react";
import { JSX } from "react";

export const RESPONSE_TO_SCOPE: Record<string, LayoutComponentScope> = {
  header: "header",
  footer: "footer",
  homePage: "home-page",
  searchPage: "search-page",
  vehiclePage: "vehicle-page",
};

export const ICON_MAP: Record<LayoutComponentScope, JSX.Element> = {
  header: <PanelTopDashedIcon />,
  footer: <PanelBottomDashedIcon />,
  "home-page": <PanelTopBottomDashedIcon />,
  "search-page": <PanelTopBottomDashedIcon />,
  "vehicle-page": <PanelTopBottomDashedIcon />,
};

export const SCOPE_LABEL: Record<LayoutComponentScope, string> = {
  header: "Cabeçalho",
  footer: "Rodapé",
  "home-page": "Página Inicial",
  "search-page": "Página de Busca",
  "vehicle-page": "Página do Veículo",
};

export const SCOPE_DESCRIPTION: Record<LayoutComponentScope, string> = {
  header: "Elementos comuns de topo exibidos em todo o site.",
  footer: "Elementos comuns de rodapé exibidos em todo o site.",
  "home-page": "Componentes específicos da página inicial.",
  "search-page": "Componentes específicos da listagem/busca.",
  "vehicle-page": "Componentes específicos da página do veículo.",
};

export const DEFAULT_LAYOUT_COMPONENTS_ORDER: Record<
  LayoutComponentScope,
  string[]
> = {
  header: ["top-bar", "header-bar"],
  footer: ["card-section", "useful-links", "footer-bar"],
  "home-page": [
    "banners",
    "info-bar",
    "featured-vehicles",
    "featured-categories",
    "featured-brands",
    "featured-sellers",
    "location",
  ],
  "search-page": [
    "search-bar",
    "recently-viewed",
    "filter-bar",
    "vehicle-listing",
  ],
  "vehicle-page": [
    "image-gallery",
    "technical-specs",
    "vehicle-description",
    "additional-features",
    "related-vehicles",
  ],
};

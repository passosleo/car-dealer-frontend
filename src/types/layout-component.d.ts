export type LayoutComponentScope =
  | "header"
  | "footer"
  | "home-page"
  | "search-page"
  | "vehicle-page";

export type LayoutComponentName =
  | "top-bar"
  | "header-bar"
  | "card-section"
  | "useful-links"
  | "footer-bar"
  | "info-bar"
  | "banners"
  | "featured-vehicles"
  | "featured-categories"
  | "featured-brands"
  | "featured-sellers"
  | "location"
  | "search-bar"
  | "recently-viewed"
  | "filter-bar"
  | "vehicle-listing"
  | "image-gallery"
  | "technical-specs"
  | "vehicle-description"
  | "additional-features"
  | "related-vehicles";

export type LayoutComponent = {
  layoutComponentId: string;
  label: string;
  name: LayoutComponentName;
  scope: LayoutComponentScope;
  description: string | null;
  position: number;
  shared: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GroupedLayoutComponents = {
  header: LayoutComponent[];
  footer: LayoutComponent[];
  "home-page": LayoutComponent[];
  "search-page": LayoutComponent[];
  "vehicle-page": LayoutComponent[];
};

export type UpdateLayoutComponentPositionsRequest = {
  layoutComponentId: string;
}[];

export type UpdateLayoutTopBarConfig = {
  maxItems: number;
  loop: boolean;
  delay: number;
  direction: "ltr" | "rtl";
  jump: boolean;
  hideOnMobile: boolean;
  hideOnDesktop: boolean;
  layoutTopBarMessages: {
    message: string;
    link: string | null;
    active: boolean;
  }[];
};

export type LayoutTopBarConfig = {
  layoutTopBarConfigId: string;
  layoutComponentId: string;
  maxItems: number;
  loop: boolean;
  delay: number;
  direction: "ltr" | "rtl";
  jump: boolean;
  hideOnMobile: boolean;
  hideOnDesktop: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  layoutTopBarMessages: {
    layoutTopBarMessageId: string;
    layoutTopBarConfigId: string;
    message: string;
    link: string | null;
    position: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
};

type LayoutInfoBarItem = {
  icon: string | null;
  title: string | null;
  description: string | null;
  link: string | null;
};

export type LayoutInfoBarConfig = {
  layoutInfoBarConfigId: string;
  layoutComponentId: string;
  items: LayoutInfoBarItem[];
  hideOnMobile: boolean;
  hideOnDesktop: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

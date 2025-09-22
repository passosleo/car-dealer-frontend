export type LayoutComponentScope =
  | "header"
  | "footer"
  | "home-page"
  | "search-page"
  | "vehicle-page";

export type LayoutComponent = {
  layoutComponentId: string;
  label: string;
  name: string;
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

export type LayoutComponentTopBarConfig = {
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

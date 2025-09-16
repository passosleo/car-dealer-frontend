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

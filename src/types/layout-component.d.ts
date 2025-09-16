export type LayoutComponent = {
  layoutComponentId: string;
  label: string;
  name: string;
  scope: "header" | "footer" | "home-page" | "search-page" | "vehicle-page";
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

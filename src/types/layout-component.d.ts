export type LayoutComponent = {
  layoutComponentId: string;
  label: string;
  name: string;
  description: string | null;
  position: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UpdateLayoutComponentPositionsRequest = {
  layoutComponentId: string;
}[];

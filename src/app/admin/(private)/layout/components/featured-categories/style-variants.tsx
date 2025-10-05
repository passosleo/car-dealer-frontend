export type STYLE_VARIANT =
  | "square-row"
  | "square-column"
  | "circle-border"
  | "circle-column";

export const STYLE_VARIANTS: { name: string; variant: STYLE_VARIANT }[] = [
  { name: "Quadrado horizontal", variant: "square-row" },
  { name: "Quadrado vertical", variant: "square-column" },
  { name: "Círculo com borda", variant: "circle-border" },
  { name: "Círculo sem borda", variant: "circle-column" },
];

export const STYLE_VARIANTS = [
  { name: "Quadrado horizontal", variant: "square-row" },
  { name: "Quadrado vertical", variant: "square-column" },
  { name: "Círculo com borda", variant: "circle-border" },
  { name: "Círculo sem borda", variant: "circle-column" },
] as const;

export type StyleVariant = (typeof STYLE_VARIANTS)[number]["variant"];

export function formatInlineInfo(
  ...args: (string | number | null | undefined)[]
): string {
  return args
    .filter(
      (item) => item !== null && item !== undefined && `${item}`.trim() !== ""
    )
    .join(" - ");
}

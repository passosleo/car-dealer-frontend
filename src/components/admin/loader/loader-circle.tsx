import { LoaderCircleIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function LoaderCircle({
  className,
  color = "primary",
  ...props
}: React.ComponentProps<typeof LoaderCircleIcon> & {
  color?: "primary" | "secondary" | "custom";
}) {
  return (
    <LoaderCircleIcon
      {...props}
      className={twMerge(
        "animate-spin",
        className,
        color === "primary"
          ? "text-primary"
          : color === "secondary"
          ? "text-secondary"
          : ""
      )}
    />
  );
}

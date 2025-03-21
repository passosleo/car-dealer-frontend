import { LoaderCircleIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function LoaderCircle({
  color = "primary",
  ...props
}: React.ComponentProps<typeof LoaderCircleIcon> & {
  color?: "primary" | "secondary";
}) {
  return (
    <LoaderCircleIcon
      {...props}
      className={twMerge(
        "animate-spin",
        color === "primary" ? "text-primary" : "text-secondary"
      )}
    />
  );
}

import {
  AvatarFallback,
  AvatarImage,
  Avatar as ShadcnAvatar,
} from "@/components/ui/avatar";
import React from "react";
import { twMerge } from "tailwind-merge";

const Avatar = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<typeof ShadcnAvatar>, "children"> & {
    name: string;
    alt?: string;
    src?: string;
    size?: "sm" | "md" | "lg";
  }
>(({ className, name, alt, src, size = "md", ...props }, ref) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  function getFallbackName() {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("");
  }

  return (
    <ShadcnAvatar
      {...props}
      ref={ref}
      className={twMerge(sizes[size], className)}
    >
      <AvatarImage src={src} alt={alt || name} />
      <AvatarFallback>{getFallbackName()}</AvatarFallback>
    </ShadcnAvatar>
  );
});

Avatar.displayName = "Avatar";

export { Avatar };

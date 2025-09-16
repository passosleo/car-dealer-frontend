"use client";
import { InfoIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { twMerge } from "tailwind-merge";

type LayoutScopeListHeaderProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
> & {
  title: string;
  badgeLabel: string;
  description: string;
};

export function LayoutScopeListHeader({
  className,
  title,
  badgeLabel,
  description,
  ...props
}: LayoutScopeListHeaderProps) {
  return (
    <div className={twMerge("mt-8 mb-4 space-y-2", className)} {...props}>
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-medium">{title}</h2>
        <Badge variant="outline">{badgeLabel}</Badge>
      </div>
      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <InfoIcon className="h-4 w-4 mt-0.5" />
        <p>{description}</p>
      </div>
    </div>
  );
}

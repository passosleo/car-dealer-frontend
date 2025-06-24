import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { LayoutComponent as LayoutComponentType } from "../types/layout-component";
import { TextNormal } from "@/components/admin/text/text-normal";
import { GripVerticalIcon, LayoutDashboardIcon, LockIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { DraggableStateSnapshot } from "@hello-pangea/dnd";

interface LayoutComponentProps extends LayoutComponentType {
  isDraggable?: boolean;
  snapshot: DraggableStateSnapshot;
}

const LayoutComponent = React.forwardRef<HTMLDivElement, LayoutComponentProps>(
  ({ isDraggable, snapshot, ...layoutComponent }, ref) => {
    const isActive = layoutComponent.active;

    const Wrapper: React.ElementType = isActive ? Link : "div";

    return (
      <Wrapper
        {...(isActive ? { href: `/admin/layout/${layoutComponent.name}` } : {})}
        className={twMerge(!isActive && "opacity-50")}
      >
        <Card
          ref={ref}
          className={twMerge(
            "flex flex-col gap-2 p-4 transition-all select-none",
            !isActive
              ? "cursor-not-allowed"
              : isDraggable
              ? "cursor-grab hover:bg-primary-foreground hover:shadow-lg"
              : "cursor-pointer hover:bg-primary-foreground"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {isActive ? (
                <LayoutDashboardIcon
                  className="text-muted-foreground"
                  size={20}
                />
              ) : (
                <LockIcon className="text-muted-foreground" size={20} />
              )}

              <div className="flex flex-col">
                <TextNormal className="font-medium text-base text-primary">
                  {layoutComponent.label}
                </TextNormal>
                {layoutComponent.description && (
                  <TextNormal className="text-sm text-muted-foreground">
                    {layoutComponent.description}
                  </TextNormal>
                )}
              </div>
            </div>

            {isDraggable && isActive && <GripVerticalIcon size={16} />}
          </div>
        </Card>
      </Wrapper>
    );
  }
);

LayoutComponent.displayName = "LayoutComponent";

export { LayoutComponent };

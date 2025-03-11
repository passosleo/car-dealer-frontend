"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

import {
  CarFront,
  Image,
  Layout,
  LayoutDashboard,
  Settings,
  ShieldEllipsis,
  Tags,
  Users,
} from "lucide-react";

const menuIconMap = {
  LayoutDashboard,
  Layout,
  Image,
  CarFront,
  Tags,
  ShieldEllipsis,
  Users,
  Settings,
};

type MenuIconMap = keyof typeof menuIconMap;

export type SidebarMenuOption = {
  title: string;
  url: string;
  icon: MenuIconMap;
};

type Props = React.ComponentProps<typeof ShadcnSidebarMenuItem> &
  SidebarMenuOption;

const SidebarMenuItem = React.forwardRef<HTMLLIElement, Props>(
  ({ url, title, icon, ...props }, ref) => {
    const pathname = usePathname();
    const isSelected = (url: string) => pathname === url;
    const IconComponent = menuIconMap[icon as keyof typeof menuIconMap];
    return (
      <ShadcnSidebarMenuItem
        {...props}
        ref={ref}
        className={twMerge(
          isSelected(url) ? "bg-sidebar-primary/10 rounded-md" : ""
        )}
      >
        <SidebarMenuButton asChild>
          <a href={url}>
            <IconComponent />
            <span>{title}</span>
          </a>
        </SidebarMenuButton>
      </ShadcnSidebarMenuItem>
    );
  }
);

SidebarMenuItem.displayName = "SidebarMenuItem";

export { SidebarMenuItem };

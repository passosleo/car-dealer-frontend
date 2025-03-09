import {
  CarFront,
  Image,
  Layout,
  LayoutDashboard,
  Settings,
  SettingsIcon,
  ShieldEllipsis,
  Tags,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { twMerge } from "tailwind-merge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Layout",
    url: "/admin/layout",
    icon: Layout,
  },
  {
    title: "Banners",
    url: "/admin/banners",
    icon: Image,
  },
  {
    title: "Veículos",
    url: "/admin/vehicles",
    icon: CarFront,
  },
  {
    title: "Categorias",
    url: "/admin/categories",
    icon: Tags,
  },
  {
    title: "Marcas",
    url: "/admin/brands",
    icon: ShieldEllipsis,
  },
  {
    title: "Vendedores",
    url: "/admin/sellers",
    icon: Users,
  },
  {
    title: "Configurações",
    url: "/admin/settings",
    icon: Settings,
  },
];

type AppSidebarProps = {
  currentPath: string;
};

export function AppSidebar({ currentPath }: AppSidebarProps) {
  const isSelected = (url: string) => currentPath.startsWith(url);
  return (
    <Sidebar>
      <SidebarContent className="mt-14">
        <SidebarGroup className="h-full">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={twMerge(
                    isSelected(item.url)
                      ? "bg-sidebar-primary/10 rounded-md"
                      : ""
                  )}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent className="mt-auto mb-4">
            <Card className="py-2 px-4 flex gap-2 items-center shadow-none rounded-md">
              <div className="flex items-center gap-2">
                <Avatar className={twMerge("w-16 h-16")}>
                  <AvatarFallback className="text-lg">US</AvatarFallback>
                </Avatar>

                <div className="mt-2">
                  <h4 className="text-sm font-semibold">Usuário</h4>
                  <p className="text-xs text-muted-foreground">Administrador</p>
                </div>
              </div>

              <Link
                href="/admin/profile"
                className="flex w-full itens-center justify-center"
              >
                <SettingsIcon
                  size={18}
                  className="text-muted-foreground hover:text-primary transition-all cursor-pointer"
                />
              </Link>
            </Card>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

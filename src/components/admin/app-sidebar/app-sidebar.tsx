import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarMenuOption, AppSidebarMenuItem } from "./app-sidebar-menu-item";
import { AlertDialog } from "../alert-dialog/alert-dialog";

const items: SidebarMenuOption[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: "CircleGauge",
  },
  {
    title: "Layout",
    url: "/admin/layout",
    icon: "Layout",
  },
  {
    title: "Aparência",
    url: "/admin/appearance",
    icon: "Layout",
  },
  {
    title: "Banners",
    url: "/admin/banners",
    icon: "Image",
  },
  {
    title: "Veículos",
    url: "/admin/vehicles",
    icon: "CarFront",
  },
  {
    title: "Categorias",
    url: "/admin/categories",
    icon: "Tags",
  },
  {
    title: "Marcas",
    url: "/admin/brands",
    icon: "ShieldEllipsis",
  },
  {
    title: "Vendedores",
    url: "/admin/sellers",
    icon: "Users",
  },
  {
    title: "Perfis de Acesso",
    url: "/admin/profiles",
    icon: "ChartNoAxesGanttIcon",
  },
  {
    title: "Usuários",
    url: "/admin/users",
    icon: "UserCogIcon",
  },
  // {
  //   title: "Configurações",
  //   url: "/admin/settings",
  //   icon: "Settings",
  // },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="mt-14">
        <SidebarGroup className="h-full">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <AppSidebarMenuItem key={item.title} {...item} />
              ))}
              <AlertDialog
                title="Você tem certeza?"
                description="Deseja realmente sair?"
                onConfirmNavigateTo="/api/logout"
              >
                <AppSidebarMenuItem key="Sair" title="Sair" icon="LogOut" />
              </AlertDialog>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

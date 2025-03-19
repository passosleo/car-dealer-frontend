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
    icon: "LayoutDashboard",
  },
  {
    title: "Layout",
    url: "/admin/layout",
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
    title: "Configurações",
    url: "/admin/settings",
    icon: "Settings",
  },
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
          {/* <SidebarGroupContent className="mt-auto mb-4">

              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <LogOutIcon size={18} className="text-primary" />
                <span className="text-sm">Sair</span>
              </div>
        
          </SidebarGroupContent> */}
          {/* <SidebarGroupContent className="mt-auto mb-4">
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
          </SidebarGroupContent> */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

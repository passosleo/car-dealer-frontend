import { AlertDialog } from "@/components/admin/alert-dialog";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";
import { cookies, headers } from "next/headers";
import React from "react";

type AdminPrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPrivateLayout({
  children,
}: Readonly<AdminPrivateLayoutProps>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const currentHeaders = await headers();
  const currentPath = currentHeaders.get("x-path") || "/";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar currentPath={currentPath} />
      <div className="flex items-center justify-between bg-sidebar h-14 w-full border-b border-sidebar-border fixed top-0 z-10">
        <SidebarTrigger className="ml-2" />

        <AlertDialog
          title="Você tem certeza?"
          description="Deseja realmente sair?"
          onConfirmNavigateTo="/admin/logout"
        >
          <span className="cursor-pointer flex items-center text-primary gap-1 mr-6 hover:bg-sidebar-accent transition-all rounded-md p-1 select-none">
            <LogOutIcon size={18} className="text-primary" />
            <span className="text-sm">Sair</span>
          </span>
        </AlertDialog>
      </div>
      <main className="w-full pt-20 px-6 h-screen flex flex-col">
        {children}
      </main>
    </SidebarProvider>
  );
}

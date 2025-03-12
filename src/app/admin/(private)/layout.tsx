import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { BellIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type AdminPrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPrivateLayout({
  children,
}: Readonly<AdminPrivateLayoutProps>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="flex items-center justify-between bg-sidebar h-14 w-full border-b border-sidebar-border fixed top-0 z-10 pr-6">
        <SidebarTrigger className="ml-2" />

        <div className="flex items-center gap-2">
          <Link href="/admin/profile" className="flex items-center gap-2 px-2">
            <Avatar
              className={twMerge("w-14 h-14 flex items-center justify-center")}
            >
              <AvatarFallback className="text-lg">US</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold">Usuário</h4>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </Link>

          <div className="w-[1px] bg-sidebar-border rounded-full h-8" />

          <Link
            href="/admin/notifications"
            className="flex items-center justify-center px-2 h-14"
          >
            <BellIcon
              size={18}
              className="text-muted-foreground cursor-pointer hover:bg-accent transition-all rounded-full"
            />
          </Link>

          {/* <Link
            href="/admin/logout"
            className="text-muted-foreground underline text-xs"
          >
            Sair
          </Link> */}
        </div>
      </div>
      <main className="w-full pt-20 px-6 h-screen flex flex-col">
        {children}
      </main>
    </SidebarProvider>
  );
}

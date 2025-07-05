import { AppSidebar } from "@/components/admin/app-sidebar/app-sidebar";
import { UserProfile } from "@/components/admin/user-profile/user-profile";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserInfo } from "@/services/types";
import { EyeIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

type AdminPrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPrivateLayout({
  children,
}: Readonly<AdminPrivateLayoutProps>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const userInfoCookie = cookieStore.get("userInfo")?.value;
  const userInfo = userInfoCookie
    ? JSON.parse(Buffer.from(userInfoCookie, "base64").toString("utf-8"))
    : (null as UserInfo | null);

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="flex items-center justify-between bg-sidebar h-14 w-full border-b border-sidebar-border fixed top-0 z-10 pr-6">
        <SidebarTrigger className="ml-2" />

        <div className="flex items-center gap-4">
          <Link href="/" target="_blank">
            <Button variant="outline" className="font-normal">
              Visualizar site
              <EyeIcon size={18} />
            </Button>
          </Link>

          <div className="w-[1px] bg-sidebar-border rounded-full h-8" />

          <UserProfile userInfo={userInfo} />

          {/* <Link
            href="/admin/notifications"
            className="flex items-center justify-center px-2 h-10 w-10 rounded-full hover:bg-muted transition-all text-muted-foreground"
          >
            <BellIcon size={18} />
          </Link> */}
        </div>
      </div>
      <main className="w-full pt-20 px-6 h-screen flex flex-col">
        {children}
      </main>
    </SidebarProvider>
  );
}

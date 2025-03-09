import { Header } from "@/layout/header";
import { TopBar } from "@/layout/topbar";
import { WhatsappButton } from "@/layout/whatsapp-button";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar isEnabled />
        <Header />
      </div>
      <div className="flex flex-1 mt-28 pt-1">{children}</div>
      <WhatsappButton />
    </main>
  );
}

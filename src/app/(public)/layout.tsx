import { Header } from "@/layout/public/header/header";
import { TopBar } from "@/layout/public/topbar";

const data = {
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png",
  title: "Mercedes-Benz",
  pages: [
    {
      id: "opportunities",
      title: "Oportunidades",
      path: "#opportunities",
      isEnabled: true,
    },
    {
      id: "categories",
      title: "Categorias",
      path: "categories",
      isEnabled: true,
    },
    {
      id: "brands",
      title: "Marcas",
      path: "#brands",
      isEnabled: true,
    },
    {
      id: "sellers",
      title: "Vendedores",
      path: "#sellers",
      isEnabled: true,
    },
    {
      id: "contact",
      title: "Contato",
      path: "#contact",
      isEnabled: true,
    },
  ],
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 max-h-28 h-full">
        <TopBar isEnabled />
        <Header data={data} />
      </div>
      <main className="flex flex-col w-full min-h-screen bg-zinc-900 mt-[115px]">
        {children}
      </main>
    </>
  );
}

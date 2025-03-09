import { HeaderDesktop } from "./desktop";
import { HeaderMobile } from "./mobile";

const data = {
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png",
  title: "Mercedes-Benz",
  pages: [
    {
      id: 'opportunities',
      title: 'Oportunidades',
      path: '#opportunities',
      isEnabled: true,
    },
    {
      id: 'categories',
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

export function Header() {


  return (
    <header className="flex justify-center h-20 w-full bg-zinc-900 px-6 border-b border-zinc-800">
      <div
        className={`flex justify-end md:justify-between items-center max-w-9xl w-full `}
      >
        <HeaderDesktop data={data} />
        <HeaderMobile data={data} />
      </div>
    </header>
  );
}

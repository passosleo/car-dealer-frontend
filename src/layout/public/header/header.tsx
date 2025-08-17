import { Logo } from "@/components/public/logo/logo";
import { Navbar, Page } from "./components/Navbar";
import Link from "next/link";
import { Search } from "lucide-react"; // Ícone de busca

type Props = {
  data: {
    logo: string;
    title: string;
    pages: Page[];
  };
};

export function Header({ data }: Props) {
  const { title, logo, pages } = data;

  return (
    <header className="md:flex hidden justify-center h-20 w-full bg-zinc-900 border-b border-zinc-800 px-4">
      <div className="flex justify-between items-center max-w-9xl w-full">
        <Logo logoImageUrl={logo} title={title} />
        <div className="flex items-center gap-9">
          <Navbar pages={pages} color="white" />

          <Link
            href="/listings"
            className="text-white flex items-center gap-2 hover:text-zinc-300 transition-colors"
          >
            <Search className="w-4 h-4" />
            Buscar
          </Link>
        </div>
      </div>
    </header>
  );
}

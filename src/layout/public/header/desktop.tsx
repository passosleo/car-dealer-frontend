import { Logo } from "@/components/public/logo/logo";
import { Navbar, Page } from "./components/Navbar";

type Props = {
  data: {
    logo: string;
    title: string;
    pages: Page[];
  };
};

export function HeaderDesktop({ data }: Props) {
  const { title, logo, pages } = data;

  return (
    <header className="md:flex hidden justify-center h-20 w-full bg-zinc-900 border-b border-zinc-800">
      <div className={`flex justify-between items-center max-w-9xl w-full`}>
        <Logo logoImageUrl={logo} title={title} />
        <div className="flex items-center gap-9">
          <Navbar pages={pages} color="white" />
          <a href="/admin" className="text-white">
            admin
          </a>
        </div>
      </div>
    </header>
  );
}

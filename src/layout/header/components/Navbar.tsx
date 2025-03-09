import Link from "next/link";

export type Page = {
  id: string;
  title: string;
  path: string;
  isEnabled: boolean;
}

type Props = {
  pages: Page[];
  direction?: "row" | "col";
  color?: string;
}

export function Navbar({ pages, direction, color }: Props) {
  return (
    <nav>
      <ul className={`flex gap-4 md:gap-10 flex-${direction} items-center`}>
        {pages.map((page) => (
          <li key={page.id}>
            <Link href={`#${page.id}`} className={`text-${color}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
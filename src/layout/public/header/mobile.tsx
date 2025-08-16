"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Navbar, Page } from "./components/Navbar";

import { Menu } from "lucide-react";
import { Logo } from "@/components/public/logo/logo";

type Props = {
  data: {
    logo: string;
    title: string;
    pages: Page[];
  };
};

export function HeaderMobile({ data }: Props) {
  const { logo, pages } = data;

  return (
    <div className="flex items-center w-full md:hidden">
      <div className="flex justify-center items-center w-full">
        <Logo logo={logo} title="" />
      </div>
      <Sheet>
        <SheetTrigger asChild className="flex ">
          <Menu color="white" size={24} />
        </SheetTrigger>
        <SheetTitle className="hidden"></SheetTitle>
        <SheetDescription className="hidden"></SheetDescription>
        <SheetContent side="right">
          <SheetHeader className="flex items-center">
            <Logo logo={logo} title="" />
          </SheetHeader>
          <div className="py-10">
            <Navbar pages={pages} direction="col" color="zinc-950" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

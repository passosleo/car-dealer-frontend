import { TopBar } from "@/layout/topbar";
import { Banners } from "../components/banners";
import { Brands } from "../components/brands";
import { Categories } from "../components/categories";
import { Contact } from "../components/contact";
import { Info } from "../components/info";
import { Opportunities } from "../components/opportunities";
import { Sellers } from "../components/sellers";
import { Header } from "@/layout/header";
import { Suspense } from "react";
import { WhatsappButton } from "@/layout/whatsapp-button";

export default function HomePage() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar isEnabled />
        <Header />
      </div>
      <div className="flex flex-1 mt-28 pt-1">
        <div className="w-full ">
          <Suspense>
            <Banners />
            <Info />
            <Opportunities />
            <Categories />
            <Brands />
            <Sellers />
            <Contact />
          </Suspense>
        </div>
      </div>
      <WhatsappButton />
    </>
  );
}

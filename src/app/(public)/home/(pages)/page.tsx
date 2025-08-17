import { Banners } from "../components/banners";
import { Brands } from "../components/brands";
import { Categories } from "../components/categories";
import { Contact } from "../components/contact";
import { Info } from "../components/info";
import { Opportunities } from "../components/opportunities";
import { Sellers } from "../components/sellers";
import { Suspense } from "react";
import { WhatsappButton } from "@/layout/public/whatsapp-button";

export default function HomePage() {
  return (
    <Suspense>
      <Banners />
      <Info />
      <Opportunities />
      <Categories />
      <Brands />
      <Sellers />
      <Contact />
      <WhatsappButton />
    </Suspense>
  );
}

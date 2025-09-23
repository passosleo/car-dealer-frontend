import { WhatsappButton } from "@/layout/public/whatsapp-button";
import { Suspense } from "react";
import { Banners } from "../components/banners";
import { Brands } from "../components/brands";
import { Categories } from "../components/categories";
import { Contact } from "../components/contact";
import { InfoBar } from "../components/info-bar";
import { Opportunities } from "../components/opportunities";
import { Sellers } from "../components/sellers";

export default function HomePage() {
  return (
    <Suspense>
      <Banners />
      <InfoBar />
      <Opportunities />
      <Categories />
      <Brands />
      <Sellers />
      <Contact />
      <WhatsappButton />
    </Suspense>
  );
}

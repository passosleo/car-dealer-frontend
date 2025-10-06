import { WhatsappButton } from "@/layout/public/whatsapp-button";
import { Suspense } from "react";
import { Banners } from "../components/banners";
import { Contact } from "../components/contact";
import { FeaturedBrandsSection } from "../components/featured-brands-section";
import { FeaturedCategoriesSection } from "../components/featured-categories-section";
import { InfoBar } from "../components/info-bar";
import { Opportunities } from "../components/opportunities";
import { Sellers } from "../components/sellers";

export default function HomePage() {
  return (
    <Suspense>
      <Banners />
      <InfoBar
        items={[
          {
            icon: "crown",
            title: "Campeão de vendas",
            description: "Somos o maior portal de carros do Brasil.",
            link: "https://example.com",
          },
          {
            icon: "instagram",
            title: "Conheça nosso Instagram",
            description: "@example",
            link: "https://example.com/contact",
          },
          {
            icon: "key-square",
            title: "Saia com seu carro novo hoje",
            description: "Financiamento na hora",
            link: "https://example.com/financing",
          },
        ]}
      />
      <Opportunities />
      <FeaturedCategoriesSection />
      <FeaturedBrandsSection styleVariant="circle-column" />
      <Sellers />
      <Contact />
      <WhatsappButton />
    </Suspense>
  );
}

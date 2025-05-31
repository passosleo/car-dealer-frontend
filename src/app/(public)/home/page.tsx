import { Banners } from "./sections/banners";
import { Contact } from "./sections/contact";
import { HighlightSection } from "./sections/highlight-section";
import { Opportunities } from "./vehicles/components/opportunities";
import { Brands } from "./brands/components/brands";
import { Categories } from "./categories/components/categories";
import { Sellers } from "./sellers/components/sellers";

export default function HomePage() {
  return (
    <div className="w-full ">
      <Banners />
      <HighlightSection />
      <Opportunities />
      <Categories />
      <Brands />
      <Sellers />
      <Contact />
    </div>
  );
}

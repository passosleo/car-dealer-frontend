import { Banners } from "./sections/banners";
import { Brands } from "./sections/brands";
import { Categories } from "./sections/categories";
import { Contact } from "./sections/contact";
import { HighlightSection } from "./sections/highlight-section";
import { Opportunities } from "./sections/opportunities";
import { Sellers } from "./sections/sellers";

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

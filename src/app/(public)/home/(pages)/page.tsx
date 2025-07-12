import { Banners } from "../components/banners";
import { Brands } from "../components/brands";
import { Categories } from "../components/categories";
import { Contact } from "../components/contact";
import { Info } from "../components/info";
import { Opportunities } from "../components/opportunities";
import { Sellers } from "../components/sellers";

export default function HomePage() {
  return (
    <div className="w-full ">
      <Banners />
      <Info />
      <Opportunities />
      <Categories />
      <Brands />
      <Sellers />
      <Contact />
    </div>
  );
}

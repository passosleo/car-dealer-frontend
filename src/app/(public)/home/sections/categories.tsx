import Image from "next/image";
import { Section } from "../components/section";

const categories = [
  {
    id: 1,
    name: 'Sedans',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/",
    isEnabled: true,
  },
  {
    id: 2,
    name: 'SUVs',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/",
    isEnabled: true,
  },
  {
    id: 3,
    name: 'Hatchbacks',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/",
    isEnabled: false,
  },
  {
    id: 4,
    name: 'Coupés',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/",
    isEnabled: false,
  },
  {
    id: 5,
    name: 'Convertibles',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/",
    isEnabled: true,
  },
  {
    id: 6,
    name: 'Pickup Trucks',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/",
    isEnabled: true,
  },
  {
    id: 7,
    name: 'Vans',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/",
    isEnabled: true,
  },
  {
    id: 8,
    name: 'Electric Cars',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/",
    isEnabled: true,
  },
];

export function Categories() {
  return (
    <Section title="Categorias" positionBlur="right" bgColor="zinc-900" id="categories">
      {categories.map((category) => {
        return category.isEnabled ? (
          <div key={category.id} className="flex justify-center items-center p-4 flex-col bg-zinc-950 shadow-md rounded-lg w-56 h-36 cursor-pointer transition-transform transform hover:scale-105">
            <Image src={category.image} alt={category.name} width={100} height={100} />
            {category.name ? <p className="text-white font-bold text-sm mt-2">{category.name}</p> : null}
          </div>
        ) : null;
      }
      )}
    </Section>
  );
}
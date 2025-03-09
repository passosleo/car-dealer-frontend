import Image from "next/image";
import { Section } from "../components/section";
import Link from "next/link";

const brands = [
  {
    id: 1,
    name: '',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/mercedes",
    isEnabled: true,
  },
  {
    id: 2,
    name: '',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/bmw",
    isEnabled: true,
  },
  {
    id: 3,
    name: '',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/audi",
    isEnabled: true,
  },
  {
    id: 4,
    name: '',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/toyota",
    isEnabled: true,
  },
  {
    id: 5,
    name: '',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/ford",
    isEnabled: true,
  },
  {
    id: 6,
    name: '',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/chevrolet",
    isEnabled: true,
  },
  {
    id: 7,
    name: '',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/honda",
    isEnabled: true,
  },
  {
    id: 8,
    name: '',
    image: 'https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png',
    url: "/tesla",
    isEnabled: true,
  },
];

export function Brands() {
  return (
    <Section positionBlur="left" bgColor="zinc-900" title="Marcas" id="brands">
      {brands.map((brand) => {
        return brand.isEnabled ? (
          <Link href={brand.url} key={brand.id} >
            <div className={`flex justify-center items-center p-4 flex-col bg-zinc-950 shadow-md rounded-full transition-transform transform hover:scale-105 w-36 h-36`}>
              <Image src={brand.image} alt={`Link para a marca ${brand.name}`} width={100} height={100} />
            </div>
          </Link>
        ) : null;
      }
      )}
    </Section>
  );
}
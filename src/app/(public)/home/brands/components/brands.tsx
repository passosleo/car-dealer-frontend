"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "../../components/section";
import { useListActiveBrandsService } from "../services/use-list-active-brands-service";

export function Brands() {
  const { brands } = useListActiveBrandsService({
    page: 1,
    limit: 100,
  });

  return (
    <Section positionBlur="left" bgColor="zinc-900" title="Marcas" id="brands">
      {brands.map((brand) => (
        <Link href={`/brands/${brand.brandId}`} key={brand.brandId}>
          <div
            className={`flex justify-center items-center p-4 flex-col bg-zinc-950 shadow-md rounded-full transition-transform transform hover:scale-105 w-36 h-36`}
          >
            <Image
              src={brand.imageUrl}
              alt={`Link para a marca ${brand.name}`}
              width={100}
              height={100}
            />
          </div>
        </Link>
      ))}
    </Section>
  );
}

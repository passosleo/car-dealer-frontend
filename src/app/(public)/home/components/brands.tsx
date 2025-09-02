"use client";

import Image from "next/image";
import Link from "next/link";
import { useListActiveBrandsService } from "@/services/public/use-list-active-brands-service";
import { Section } from "@/components/public/section/section";
import { BrandsSkeleton } from "./skeletons/brands-skeleton";

export function Brands() {
  const maxBrandsToShow = 6;
  const { brands, isPending } = useListActiveBrandsService({
    page: 1,
    limit: maxBrandsToShow,
  });

  return (
    <Section positionBlur="left" bgColor="zinc-900" title="Marcas" id="brands">
      {isPending ? (
        <BrandsSkeleton count={maxBrandsToShow} />
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {brands.map((brand) => (
            <Link
              href={`/brands/${brand.brandId}`}
              key={brand.brandId}
              className="
              group flex items-center justify-center
              w-40 h-40 rounded-full
              bg-zinc-950
              transition-all duration-300
              hover:bg-zinc-800 hover:scale-105
            "
            >
              <Image
                src={brand.imageUrl}
                alt={`Link para a marca ${brand.name}`}
                width={80}
                height={80}
                className="
                object-contain drop-shadow
                transition-transform duration-300
                group-hover:scale-105
              "
              />
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}

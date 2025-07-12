"use client";

import Image from "next/image";
import { useListActiveCategoriesService } from "../services/use-list-active-categories-service";
import Link from "next/link";
import { Section } from "./section";

export function Categories() {
  const { categories } = useListActiveCategoriesService({
    page: 1,
    limit: 100,
  });
  return (
    <Section
      title="Categorias"
      positionBlur="right"
      bgColor="zinc-900"
      id="categories"
    >
      {categories.map((category) => (
        <Link
          href={`/categories/${category.categoryId}`}
          key={category.categoryId}
          className="flex justify-center items-center p-4 flex-col bg-zinc-950 shadow-md rounded-lg w-56 h-36 cursor-pointer transition-transform transform hover:scale-105"
        >
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={100}
            height={100}
          />
          {category.name ? (
            <p className="text-white font-bold text-sm mt-2">{category.name}</p>
          ) : null}
        </Link>
      ))}
    </Section>
  );
}

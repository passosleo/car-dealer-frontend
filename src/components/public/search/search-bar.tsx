import React from "react";
import { SearchForm } from "../../shared/search/search-form";
import { SearchInput } from "./search-input";

export function SearchBar(
  props: Omit<React.ComponentProps<typeof SearchForm>, "children">
) {
  return (
    <div className="w-full border-b border-zinc-800 px-4 py-8 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950">
      <SearchForm {...props}>
        <SearchInput
          placeholder="Busque por modelo, marca ou ano..."
          aria-label="Buscar veículos"
          autoFocus
        />
      </SearchForm>

      {/* Itens vistos recentemente */}
      <div className="max-w-5xl mx-auto mt-6">
        <h2 className="text-sm text-white font-semibold mb-2">
          Vistos recentemente
        </h2>
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="min-w-[200px] bg-zinc-800 text-white rounded-md p-3 shadow-md hover:bg-zinc-700 transition"
            >
              <h3 className="font-semibold">Veículo {i + 1}</h3>
              <p className="text-sm text-zinc-300">Descrição breve...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

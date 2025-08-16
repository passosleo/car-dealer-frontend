import { SearchBar } from "@/components/public/search/search-bar";
import { VehicleList } from "../components/vehicle-list";

export default function ListingsPage() {
  return (
    <>
      <SearchBar />

      {/* Conteúdo principal (mantém o que você já tinha) */}
      <div className="flex flex-1">
        <aside className="w-64 p-4 border-r border-zinc-800">
          <h2 className="font-semibold mb-4 text-white">Filtros</h2>
          <ul className="space-y-2 text-white">
            <li>Marca</li>
            <li>Modelo</li>
            <li>Ano</li>
            <li>Preço</li>
          </ul>
        </aside>

        <VehicleList />
      </div>
    </>
  );
}

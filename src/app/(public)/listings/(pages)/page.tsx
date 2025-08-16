import { SearchBar } from "@/components/public/search/search-bar";

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

        <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              <h3 className="font-bold">Veículo {i + 1}</h3>
              <p className="text-sm text-gray-600">Descrição do anúncio...</p>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}

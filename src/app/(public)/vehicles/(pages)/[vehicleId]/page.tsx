import { Suspense } from "react";
import { DefaultFilters } from "@/types/generic";
import { Vehicle } from "@/types/vehicle";

function mockVehicle(): Vehicle {
  return {
    vehicleId: "mock-123",
    model: "Civic Touring",
    year: 2022,
    plate: "ABC-1234",
    description:
      "Veículo em excelente estado, único dono, todas revisões feitas na concessionária. Bancos de couro, ar-condicionado digital, sistema multimídia com Android Auto e Apple CarPlay.",
    price: 145000,
    mileage: 18500,
    color: "Prata",
    transmission: "Automático",
    fuelType: "Flex",
    doors: 4,
    seats: 5,
    horsepower: 173,
    torque: 220,
    driveTrain: "Dianteira",
    brand: { id: "honda", name: "Honda" } as any,
    category: { id: "sedan", name: "Sedan" } as any,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    vehicleImages: [
      "/mock/civic-frente.jpg",
      "/mock/civic-traseira.jpg",
      "/mock/civic-interior.jpg",
    ],
    vehicleFeatures: [
      "Ar-condicionado digital",
      "Direção elétrica",
      "Bancos de couro",
      "Sensor de ré",
      "Câmera de ré",
      "Controle de estabilidade",
    ],
  };
}

function formatBRL(value?: number | null) {
  if (value == null) return "-";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function ViewVehiclePage({
  searchParams,
}: {
  searchParams: Promise<Partial<DefaultFilters> & { vehicleId?: string }>;
}) {
  const params = await searchParams;
  const vehicleId = params?.vehicleId ?? "";

  // 🔹 Agora não busca no backend, apenas retorna mock
  const vehicle = mockVehicle();

  return (
    <Suspense>
      <main className="w-full bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Caso não tenha carregado/erro */}
          {!vehicle ? (
            <div className="text-zinc-300 border border-dashed border-zinc-800 rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-2">
                Veículo não encontrado
              </h2>
              <p className="text-zinc-400">
                Verifique o identificador do veículo ou tente novamente.
              </p>
            </div>
          ) : (
            <>
              {/* Cabeçalho simples com breadcrumb/labels (opcional) */}
              <header className="mb-6">
                <nav className="text-sm text-zinc-400 mb-2">
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Veículos
                  </span>
                  <span className="mx-2 text-zinc-600">/</span>
                  <span className="text-zinc-300">{vehicle.brand?.name}</span>
                  <span className="mx-2 text-zinc-600">/</span>
                  <span className="text-zinc-100">{vehicle.model}</span>
                </nav>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {vehicle.brand?.name} {vehicle.model}{" "}
                  {vehicle.year ? `(${vehicle.year})` : ""}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  {vehicle.category?.name && (
                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs">
                      {vehicle.category.name}
                    </span>
                  )}
                  {vehicle.fuelType && (
                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs">
                      {vehicle.fuelType}
                    </span>
                  )}
                  {vehicle.transmission && (
                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs">
                      {vehicle.transmission}
                    </span>
                  )}
                </div>
              </header>

              {/* Grid principal: imagem à esquerda, info/preço à direita */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* === Placeholder do Carrossel de Imagens === */}
                <div className="w-full">
                  <div className="aspect-[16/10] w-full rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
                    <span className="text-zinc-400">
                      [Carrossel de imagens do veículo]
                    </span>
                  </div>

                  {/* Thumbs placeholder (opcional) */}
                  <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-16 rounded-lg border border-dashed border-zinc-800 bg-zinc-900/40"
                      />
                    ))}
                  </div>
                </div>

                {/* Painel de informações e preço */}
                <aside className="w-full rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {vehicle.brand?.name} {vehicle.model}
                      </h2>
                      <p className="text-zinc-400 text-sm">
                        Placa: {vehicle.plate || "-"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-zinc-400">Preço</p>
                      <p className="text-2xl font-bold">
                        {formatBRL(vehicle.price)}
                      </p>
                    </div>
                  </div>

                  {/* Ações (CTAs) */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button className="h-11 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors font-medium">
                      Conversar no WhatsApp
                    </button>
                    <button className="h-11 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors font-medium">
                      Solicitar proposta
                    </button>
                  </div>

                  {/* Especificações rápidas */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                      Especificações
                    </h3>
                    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <Spec label="Ano" value={vehicle.year ?? "-"} />
                      <Spec
                        label="Quilometragem"
                        value={
                          vehicle.mileage != null
                            ? `${vehicle.mileage} km`
                            : "-"
                        }
                      />
                      <Spec label="Cor" value={vehicle.color ?? "-"} />
                      <Spec
                        label="Câmbio"
                        value={vehicle.transmission ?? "-"}
                      />
                      <Spec
                        label="Combustível"
                        value={vehicle.fuelType ?? "-"}
                      />
                      <Spec label="Portas" value={vehicle.doors ?? "-"} />
                      <Spec label="Lugares" value={vehicle.seats ?? "-"} />
                      <Spec
                        label="Potência"
                        value={
                          vehicle.horsepower != null
                            ? `${vehicle.horsepower} cv`
                            : "-"
                        }
                      />
                      <Spec
                        label="Torque"
                        value={
                          vehicle.torque != null ? `${vehicle.torque} Nm` : "-"
                        }
                      />
                      <Spec label="Tração" value={vehicle.driveTrain ?? "-"} />
                    </dl>
                  </div>
                </aside>
              </section>

              {/* Descrição */}
              <section className="mt-10">
                <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-zinc-300 leading-relaxed">
                  {vehicle.description?.trim() || "Sem descrição fornecida."}
                </div>
              </section>

              {/* Itens/Recursos do veículo */}
              {!!vehicle.vehicleFeatures?.length && (
                <section className="mt-10">
                  <h3 className="text-lg font-semibold mb-3">
                    Itens e recursos
                  </h3>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-zinc-300">
                      {vehicle.vehicleFeatures.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Placeholder: Veículos semelhantes (carrossel futuro) */}
              <section className="mt-12">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">
                    Veículos semelhantes
                  </h3>
                  <a className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
                    Ver todos
                  </a>
                </div>
                <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-10 text-center text-zinc-400">
                  [Carrossel de veículos semelhantes]
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </Suspense>
  );
}

function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
      <dt className="text-zinc-400 text-xs">{label}</dt>
      <dd className="text-zinc-100 font-medium mt-1">{value}</dd>
    </div>
  );
}

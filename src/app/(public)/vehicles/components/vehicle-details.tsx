"use client";

import { useGetActiveVehicleByIdService } from "@/services/public/use-get-active-vehicle-by-id-service";
import { useParams } from "next/navigation";

function formatBRL(value?: number | null) {
  if (value == null) return "-";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}

export function VehicleDetails() {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const { vehicle } = useGetActiveVehicleByIdService(vehicleId);

  if (!vehicle) {
    return null;
  }

  return (
    <>
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
              <p className="text-2xl font-bold">{formatBRL(vehicle.price)}</p>
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
                value={vehicle.mileage != null ? `${vehicle.mileage} km` : "-"}
              />
              <Spec label="Cor" value={vehicle.color ?? "-"} />
              <Spec label="Câmbio" value={vehicle.transmission ?? "-"} />
              <Spec label="Combustível" value={vehicle.fuelType ?? "-"} />
              <Spec label="Portas" value={vehicle.doors ?? "-"} />
              <Spec label="Lugares" value={vehicle.seats ?? "-"} />
              <Spec
                label="Potência"
                value={
                  vehicle.horsepower != null ? `${vehicle.horsepower} cv` : "-"
                }
              />
              <Spec
                label="Torque"
                value={vehicle.torque != null ? `${vehicle.torque} Nm` : "-"}
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
          <h3 className="text-lg font-semibold mb-3">Itens e recursos</h3>
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
          <h3 className="text-lg font-semibold">Veículos semelhantes</h3>
          <a className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
            Ver todos
          </a>
        </div>
        <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-10 text-center text-zinc-400">
          [Carrossel de veículos semelhantes]
        </div>
      </section>
    </>
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

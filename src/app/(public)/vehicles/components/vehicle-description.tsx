import { twMerge } from "tailwind-merge";

type VehicleDescriptionProps = React.ComponentProps<"section"> & {
  description?: string | null;
};

export function VehicleDescription({
  description,
  className,
  ...props
}: VehicleDescriptionProps) {
  return (
    <section className={twMerge("mt-10", className)} {...props}>
      <h3 className="text-lg font-semibold mb-3">Descrição</h3>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-zinc-300 leading-relaxed">
        {description?.trim() || "Descrição não disponível."}
      </div>
    </section>
  );
}

import { Card } from "@/components/public/card/card";
import { twMerge } from "tailwind-merge";

type VehicleFeaturesProps = React.ComponentProps<"section"> & {
  features: string[];
};

export function VehicleFeatures({
  features = [],
  className,
  ...props
}: VehicleFeaturesProps) {
  return (
    <section className={twMerge("mt-10", className)} {...props}>
      <h3 className="text-lg font-semibold mb-3">Itens e recursos</h3>
      <Card>
        {!!features.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-zinc-300">
            {features.map((feat) => (
              <li key={feat} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                {feat}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-zinc-300">Nenhum item ou recurso listado.</span>
        )}
      </Card>
    </section>
  );
}

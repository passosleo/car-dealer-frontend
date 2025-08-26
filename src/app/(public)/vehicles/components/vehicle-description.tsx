import { Card } from "@/components/public/card/card";
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
      <Card>
        <p className="text-zinc-300 leading-relaxed">
          {description?.trim() || "Descrição não disponível."}
        </p>
      </Card>
    </section>
  );
}

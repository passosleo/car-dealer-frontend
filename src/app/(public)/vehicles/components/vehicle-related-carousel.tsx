import { Card } from "@/components/public/card/card";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type VehicleRelatedCarouselProps = React.ComponentProps<"section">;

export function VehicleRelatedCarousel({
  className,
  ...props
}: VehicleRelatedCarouselProps) {
  return (
    <section className={twMerge("mt-12", className)} {...props}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Veículos semelhantes</h3>
        <Link
          href="/vehicles"
          className="text-sm text-blue-600 hover:text-blue-500 transition-colors cursor-pointer"
        >
          Ver todos
        </Link>
      </div>
      <Card className="border-dashed p-10 text-center text-zinc-400">
        [Carrossel de veículos semelhantes]
      </Card>
    </section>
  );
}

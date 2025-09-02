"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Section } from "@/components/public/section/section";
import { useListActiveVehiclesService } from "@/services/public/use-list-active-vehicles-service";
import { VehicleCard } from "@/components/public/vehicle/vehicle-card";
import { twMerge } from "tailwind-merge";
import {
  ArrowRightCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { VehicleCardSkeleton } from "@/components/public/vehicle/skeletons/vehicle-card-skeleton";
import Link from "next/link";

export function Opportunities() {
  const maxVehiclesToShow = 6;
  const { vehicles, isPending } = useListActiveVehiclesService({
    page: 1,
    limit: maxVehiclesToShow,
  });

  const itemClass = twMerge(
    "basis-full sm:basis-1/2 lg:basis-1/3 shrink-0 min-w-[260px]"
  );

  return (
    <Section bgColor="zinc-950" id="opportunities" className="select-none">
      <div className="flex items-center justify-between gap-10 flex-wrap">
        <div className="text-white 2xl:max-w-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-10 bg-blue-500" />
            <p className="font-light text-gray-400">Oportunidades</p>
          </div>
          <h2 className="text-4xl font-bold mb-3">
            Veja algumas oportunidades
          </h2>
          <p className="text-base">
            Você terá acesso a muitas ofertas, todas com os melhores preços do
            brasil!
          </p>
        </div>

        <Carousel className="max-w-64 sm:max-w-[32rem] lg:max-w-[63rem] mx-auto">
          <CarouselContent className="px-2">
            {isPending ? (
              Array.from({ length: maxVehiclesToShow }).map((_, i) => (
                <CarouselItem key={`skeleton-${i}`} className={itemClass}>
                  <VehicleCardSkeleton />
                </CarouselItem>
              ))
            ) : (
              <>
                {vehicles.slice(0, maxVehiclesToShow).map((vehicle) => (
                  <CarouselItem key={vehicle.vehicleId} className={itemClass}>
                    <VehicleCard {...vehicle} />
                  </CarouselItem>
                ))}
                <CarouselItem className={itemClass}>
                  <div className="flex items-center justify-center h-full w-full">
                    <Link
                      href="/vehicles"
                      className="h-full w-full flex flex-col items-center justify-center gap-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors text-zinc-400"
                    >
                      <ArrowRightCircleIcon size={32} />
                      Ver mais
                    </Link>
                  </div>
                </CarouselItem>
              </>
            )}
          </CarouselContent>

          <CarouselPrevious className="bg-transparent text-zinc-50 border-none hover:bg-white/10 hover:text-zinc-400 h-10 w-10">
            <ChevronLeftIcon strokeWidth={2.5} />
          </CarouselPrevious>
          <CarouselNext className="bg-transparent text-zinc-50 border-none hover:bg-white/10 hover:text-zinc-400 h-10 w-10">
            <ChevronRightIcon strokeWidth={2.5} />
          </CarouselNext>
        </Carousel>
      </div>
    </Section>
  );
}

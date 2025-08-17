"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Shelf } from "./shelf";
import { Section } from "@/components/public/section/section";
import { useListActiveVehiclesService } from "@/services/public/use-list-active-vehicles-service";

export function Opportunities() {
  const { vehicles } = useListActiveVehiclesService({
    page: 1,
    limit: 100,
  });
  return (
    <Section bgColor="zinc-950" id="opportunities">
      <div className="flex items-center justify-between gap-10 flex-wrap">
        <div className="text-white 2xl:max-w-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-10 bg-blue-500" />
            <p className="font-light text-gray-400">Oportunidades</p>
          </div>
          <h2 className="text-4xl font-bold mb-3">
            Veja algumas oportunidades{" "}
          </h2>
          <p className="text-base">
            Você terá acesso a muitas ofertas, todas com os melhores preços do
            brasil!
          </p>
        </div>

        <Carousel className="max-w-80 lg:max-w-[63rem] mx-auto">
          <CarouselContent>
            {vehicles.map((vehicle) => (
              <CarouselItem key={vehicle.vehicleId} className=" lg:basis-1/3">
                <Shelf {...vehicle} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute md:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition" />
          <CarouselNext className="absolute md:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition" />
        </Carousel>
      </div>
    </Section>
  );
}

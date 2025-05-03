"use client";
import Image from "next/image";
import { Vehicle } from "./vehicle";
import { TextNormal } from "@/components/admin/text/text-normal";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { PageContentList } from "@/components/admin/page/page-content-list";
import { useListVehiclesService } from "../services/use-list-vehicles-service";
import { ListVehicleFilters } from "../types/vehicle";

export function VehicleList({
  appliedFilters,
}: {
  appliedFilters: Partial<ListVehicleFilters>;
}) {
  const { vehicles, totalPages, isPending, isEmpty } =
    useListVehiclesService(appliedFilters);
  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center h-full">
          <LoaderCustom />
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center my-auto">
          <Image
            src="/images/people-search.svg"
            alt="Ilustração de página sem dados"
            width={180}
            height={180}
          />
          <TextNormal className="my-4">Nenhum veículo encontrado</TextNormal>
        </div>
      ) : (
        <PageContentList
          items={vehicles}
          renderItem={(vehicle) => <Vehicle {...vehicle} />}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

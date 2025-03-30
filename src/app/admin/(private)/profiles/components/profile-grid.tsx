"use client";
import { DefaultFilters } from "@/services/types";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import Image from "next/image";
import { useListProfilesService } from "../services/use-list-profiles-service";
import { Profile } from "./profile";
import { PageContentGrid } from "@/components/admin/page/page-content-grid";

export function ProfileGrid({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  const { profiles, totalPages, isPending, isEmpty } =
    useListProfilesService(appliedFilters);

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
          <TextNormal className="my-4">
            Nenhum perfil de acesso encontrado
          </TextNormal>
        </div>
      ) : (
        <PageContentGrid
          items={profiles}
          renderItem={(profile) => <Profile {...profile} />}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

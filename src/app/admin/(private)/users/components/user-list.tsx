"use client";

import Image from "next/image";
import { User } from "./user";
import { PageContentList } from "@/components/admin/page/page-content-list";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import { DefaultFilters } from "@/types/generic";
import { useListUsersService } from "@/services/private/users/use-list-users-service";

export function UserList({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  const { users, totalPages, isPending, isEmpty } =
    useListUsersService(appliedFilters);
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
          <TextNormal className="my-4">Nenhum usuário encontrado</TextNormal>
        </div>
      ) : (
        <PageContentList
          items={users}
          renderItem={(user) => <User {...user} />}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

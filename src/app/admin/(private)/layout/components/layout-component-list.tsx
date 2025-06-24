"use client";
import Image from "next/image";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import { PageContentList } from "@/components/admin/page/page-content-list";
import { useListLayoutComponentsService } from "../services/use-list-layout-components-service";
import { LayoutComponent } from "./layout-component";

export function LayoutComponentList() {
  const { layoutComponents, isPending, isEmpty } =
    useListLayoutComponentsService();

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
          <TextNormal className="my-4">Nenhuma categoria encontrada</TextNormal>
        </div>
      ) : (
        <PageContentList
          items={layoutComponents}
          renderItem={(layoutComponent) => (
            <LayoutComponent {...layoutComponent} isDraggable />
          )}
        />
      )}
    </>
  );
}

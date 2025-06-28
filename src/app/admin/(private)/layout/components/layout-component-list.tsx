"use client";
import React from "react";
import Image from "next/image";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import { useListLayoutComponentsService } from "../services/use-list-layout-components-service";
import { LayoutComponent } from "./layout-component";
import { PageContentDraggable } from "@/components/admin/page/page-content-draggable";
import { DropResult } from "@hello-pangea/dnd";
import { LayoutComponent as LayoutComponentType } from "../types/layout-component";

export function LayoutComponentList() {
  const [layoutComponentsState, setLayoutComponentsState] = React.useState<
    LayoutComponentType[]
  >([]);

  const { isPending, isEmpty } = useListLayoutComponentsService({
    onSuccess: setLayoutComponentsState,
  });

  function onDragEnd(dropResult: DropResult) {
    if (!dropResult.destination) {
      return;
    }

    const reorderedComponents = Array.from(layoutComponentsState);
    const [removed] = reorderedComponents.splice(dropResult.source.index, 1);
    reorderedComponents.splice(dropResult.destination.index, 0, removed);

    setLayoutComponentsState(reorderedComponents);
  }

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
          <TextNormal className="my-4">Nenhum componente encontrado</TextNormal>
        </div>
      ) : (
        <>
          <PageContentDraggable
            items={layoutComponentsState}
            renderItem={(layoutComponent, _, snapshot) => (
              <LayoutComponent
                {...layoutComponent}
                snapshot={snapshot}
                isDraggable
              />
            )}
            onDragEnd={onDragEnd}
          />
        </>
      )}
    </>
  );
}

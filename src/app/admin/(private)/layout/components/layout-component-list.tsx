"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import { useListLayoutComponentsService } from "../services/use-list-layout-components-service";
import { LayoutComponent } from "./layout-component";
import { PageContentDraggable } from "@/components/admin/page/page-content-draggable";
import { DropResult } from "@hello-pangea/dnd";
import { LayoutComponent as LayoutComponentType } from "../types/layout-component";
import { useUpdateLayoutComponentPositionsService } from "../services/use-update-layout-component-positions-service";

export function LayoutComponentList() {
  const [layoutComponentsState, setLayoutComponentsState] = useState<
    LayoutComponentType[]
  >([]);

  const { isPending: isListPending, isEmpty } = useListLayoutComponentsService({
    onSuccess: (data) => {
      setLayoutComponentsState(data);
    },
  });

  const { updateLayoutComponentPositions } =
    useUpdateLayoutComponentPositionsService();

  const onDragEnd = useCallback(
    (dropResult: DropResult) => {
      const { source, destination } = dropResult;
      if (!destination || source.index === destination.index) return;

      const updatedComponents = [...layoutComponentsState];
      const [moved] = updatedComponents.splice(source.index, 1);
      updatedComponents.splice(destination.index, 0, moved);

      setLayoutComponentsState(updatedComponents);

      updateLayoutComponentPositions({
        params: { page: "home" },
        payload: updatedComponents.map((component) => ({
          layoutComponentId: component.layoutComponentId,
        })),
      });
    },
    [layoutComponentsState, updateLayoutComponentPositions]
  );

  return (
    <>
      {isListPending ? (
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
      )}
    </>
  );
}

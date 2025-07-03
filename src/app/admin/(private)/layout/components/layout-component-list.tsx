"use client";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import { useListLayoutComponentsService } from "../services/use-list-layout-components-service";
import { LayoutComponent } from "./layout-component";
import { PageContentDraggable } from "@/components/admin/page/page-content-draggable";
import { DropResult } from "@hello-pangea/dnd";
import { LayoutComponent as LayoutComponentType } from "../types/layout-component";

export function LayoutComponentList() {
  const [layoutComponentsState, setLayoutComponentsState] = useState<
    LayoutComponentType[]
  >([]);
  const [enableDragAndDrop, setEnableDragAndDrop] = useState(true);

  const {
    layoutComponents,
    isPending: isListPending,
    isEmpty,
  } = useListLayoutComponentsService({
    onSuccess: (data) => {
      setLayoutComponentsState(data);
    },
  });

  const onDragEnd = useCallback(
    (dropResult: DropResult) => {
      const { source, destination } = dropResult;
      if (!destination || source.index === destination.index) return;

      const updatedComponents = [...layoutComponentsState];
      const [moved] = updatedComponents.splice(source.index, 1);
      updatedComponents.splice(destination.index, 0, moved);

      const isSameOrder = updatedComponents.every(
        (component, index) =>
          component.layoutComponentId ===
          layoutComponentsState[index].layoutComponentId
      );

      if (!isSameOrder) {
        setLayoutComponentsState(updatedComponents);
      }
    },
    [layoutComponentsState]
  );

  const hasUnsavedChanges = useMemo(() => {
    return layoutComponentsState.some(
      (component, index) =>
        component.layoutComponentId !==
        layoutComponents[index]?.layoutComponentId
    );
  }, [layoutComponentsState, layoutComponents]);

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
              isDraggable={enableDragAndDrop}
            />
          )}
          onDragEnd={onDragEnd}
          isDragDisabled={!enableDragAndDrop}
          enableFooter={hasUnsavedChanges}
          onClickSave={() => null}
          onClickCancel={() => {
            setLayoutComponentsState(layoutComponents);
            setEnableDragAndDrop(false);
          }}
        />
      )}
    </>
  );
}

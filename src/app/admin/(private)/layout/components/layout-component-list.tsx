import Image from "next/image";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import { LayoutComponent } from "./layout-component";
import { PageContentDraggable } from "@/components/admin/page/page-content-draggable";
import { DropResult, ResponderProvided } from "@hello-pangea/dnd";
import { LayoutComponent as LayoutComponentType } from "@/types/layout-component";

export function LayoutComponentList({
  isLoading,
  isListLoading,
  isEmpty,
  isDragAndDropEnabled,
  layoutComponents = [],
  onDragEnd,
  onClickSave,
  onClickCancel,
  hasUnsavedChanges,
}: {
  isListLoading?: boolean;
  isLoading?: boolean;
  isEmpty?: boolean;
  isDragAndDropEnabled?: boolean;
  layoutComponents?: LayoutComponentType[];
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  hasUnsavedChanges?: boolean;
}) {
  return (
    <>
      {isListLoading ? (
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
          items={layoutComponents}
          renderItem={(layoutComponent, _, snapshot) => (
            <LayoutComponent
              {...layoutComponent}
              snapshot={snapshot}
              isDraggable={isDragAndDropEnabled && layoutComponent.active}
            />
          )}
          enableFooter={isDragAndDropEnabled}
          isDragDisabled={!isDragAndDropEnabled}
          isLoading={isLoading}
          hasUnsavedChanges={hasUnsavedChanges}
          onDragEnd={onDragEnd}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}
        />
      )}
    </>
  );
}

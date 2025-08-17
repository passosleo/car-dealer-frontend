"use client";

import { Button } from "@/components/ui/button";
import { ListRestartIcon, ShuffleIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { LayoutComponentList } from "../components/layout-component-list";
import { useCallback, useMemo, useState } from "react";
import { LayoutComponent as LayoutComponentType } from "@/types/layout-component";
import { DropResult } from "@hello-pangea/dnd";
import { useListLayoutComponentsService } from "@/services/private/layout/use-list-layout-components-service";
import { useUpdateLayoutComponentPositionsService } from "@/services/private/layout/use-update-layout-component-positions-service";

const DEFAULT_LAYOUT_ORDER = [
  "top-bar",
  "header",
  "banners",
  "info",
  "footer",
  "categories",
  "brands",
  "sellers",
  "location",
] as const;

export default function LayoutPage() {
  const [isDragAndDropEnabled, setIsDragAndDropEnabled] = useState(false);

  const [layoutComponentsState, setLayoutComponentsState] = useState<
    LayoutComponentType[]
  >([]);

  const {
    layoutComponents,
    isPending: isListPending,
    isEmpty,
  } = useListLayoutComponentsService({
    onSuccess: (data) => {
      setLayoutComponentsState(data);
    },
  });

  const { updateLayoutComponentPositions, isPending: isUpdatePending } =
    useUpdateLayoutComponentPositionsService();

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

  const isDefaultOrder = useMemo(() => {
    return layoutComponentsState.every((component, index) => {
      return (
        component.name === DEFAULT_LAYOUT_ORDER[index] &&
        component.layoutComponentId ===
          layoutComponents[index]?.layoutComponentId
      );
    });
  }, [layoutComponentsState, layoutComponents]);

  const onClickSave = useCallback(() => {
    if (!hasUnsavedChanges) {
      setIsDragAndDropEnabled(false);
      return;
    }

    updateLayoutComponentPositions(
      {
        params: { page: "home" },
        payload: layoutComponentsState.map((component) => ({
          layoutComponentId: component.layoutComponentId,
        })),
      },
      { onSuccess: () => setIsDragAndDropEnabled(false) }
    );
  }, [
    hasUnsavedChanges,
    layoutComponentsState,
    updateLayoutComponentPositions,
  ]);

  const onClickCancel = useCallback(() => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm(
        "Você tem alterações não salvas. Tem certeza que deseja cancelar?"
      );
      if (!confirm) return;
    }
    setLayoutComponentsState(layoutComponents);
    setIsDragAndDropEnabled(false);
  }, [hasUnsavedChanges, layoutComponents]);

  const onRestoreDefault = useCallback(() => {
    const confirm = window.confirm(
      "Tem certeza que deseja restaurar o layout para o padrão? Todas as alterações serão perdidas."
    );
    if (!confirm) return;

    const reorderedComponents = DEFAULT_LAYOUT_ORDER.map((name) => {
      return layoutComponents.find((component) => component.name === name);
    }).filter(Boolean) as LayoutComponentType[];

    updateLayoutComponentPositions(
      {
        params: { page: "home" },
        payload: reorderedComponents.map((component) => ({
          layoutComponentId: component.layoutComponentId,
        })),
      },
      {
        onSuccess: () => {
          setLayoutComponentsState(reorderedComponents);
          setIsDragAndDropEnabled(false);
        },
      }
    );
  }, [layoutComponents, updateLayoutComponentPositions]);

  return (
    <PageLayout withBackButton>
      <PageHeader title="Layout" description="Gerencie o layout da sua loja.">
        <div className="flex items-center gap-4">
          <Button
            className="flex gap-1 items-center justify-center transition-all"
            disabled={isDragAndDropEnabled || isListPending}
            onClick={() => setIsDragAndDropEnabled((prev) => !prev)}
          >
            <ShuffleIcon />
            Reordenar
          </Button>
          <Button
            className="flex gap-1 items-center justify-center transition-all"
            variant="outline"
            disabled={isUpdatePending || isDefaultOrder}
            onClick={onRestoreDefault}
          >
            <ListRestartIcon />
            Restaurar ordem padrão
          </Button>
        </div>
      </PageHeader>
      <LayoutComponentList
        isDragAndDropEnabled={isDragAndDropEnabled}
        layoutComponents={layoutComponentsState}
        onDragEnd={onDragEnd}
        isLoading={isUpdatePending}
        isListLoading={isListPending}
        isEmpty={isEmpty}
        onClickSave={onClickSave}
        onClickCancel={onClickCancel}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </PageLayout>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { ListRestartIcon, ShuffleIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { useCallback, useMemo, useState } from "react";
import {
  LayoutComponentScope,
  LayoutComponent as LayoutComponentType,
} from "@/types/layout-component";
import { DropResult } from "@hello-pangea/dnd";
import { useUpdateLayoutComponentPositionsService } from "@/services/private/layout/use-update-layout-component-positions-service";
import { useParams } from "next/navigation";
import {
  DEFAULT_LAYOUT_COMPONENTS_ORDER,
  SCOPE_DESCRIPTION,
  SCOPE_LABEL,
} from "../../constants";
import { LayoutComponentList } from "../../components/layout-component-list";
import { useListLayoutComponentsByScopeService } from "@/services/private/layout/use-list-layout-components-by-scope";

export default function LayoutComponentsPage() {
  const { scope } = useParams<{ scope: LayoutComponentScope }>();

  const [isDragAndDropEnabled, setIsDragAndDropEnabled] = useState(false);
  const [layoutComponentsState, setLayoutComponentsState] = useState<
    LayoutComponentType[]
  >([]);

  const {
    layoutComponents = [],
    isPending: isListPending,
    isEmpty,
  } = useListLayoutComponentsByScopeService(scope, {
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

      setLayoutComponentsState(updatedComponents);
    },
    [layoutComponentsState]
  );

  const hasUnsavedChanges = useMemo(() => {
    if (layoutComponents.length !== layoutComponentsState.length) return true;

    return !layoutComponentsState.every((component, index) => {
      return (
        component.layoutComponentId ===
        layoutComponents[index]?.layoutComponentId
      );
    });
  }, [layoutComponentsState, layoutComponents]);

  const isDefaultOrder = useMemo(() => {
    const defaultNames = DEFAULT_LAYOUT_COMPONENTS_ORDER[scope];
    if (!defaultNames) return false;

    return layoutComponentsState.every((component, index) => {
      const defaultName = defaultNames[index];
      return (
        component.name === defaultName &&
        component.layoutComponentId ===
          layoutComponents.find((c) => c.name === defaultName)
            ?.layoutComponentId
      );
    });
  }, [layoutComponentsState, layoutComponents, scope]);

  const onClickSave = useCallback(() => {
    if (!hasUnsavedChanges) {
      setIsDragAndDropEnabled(false);
      return;
    }

    updateLayoutComponentPositions(
      {
        params: { scope },
        payload: layoutComponentsState.map((component) => ({
          layoutComponentId: component.layoutComponentId,
        })),
      },
      { onSuccess: () => setIsDragAndDropEnabled(false) }
    );
  }, [
    hasUnsavedChanges,
    layoutComponentsState,
    scope,
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

    const defaultNames = DEFAULT_LAYOUT_COMPONENTS_ORDER[scope];
    if (!defaultNames) return;

    const reorderedComponents = defaultNames
      .map((name) =>
        layoutComponents.find((component) => component.name === name)
      )
      .filter(Boolean) as LayoutComponentType[];

    updateLayoutComponentPositions(
      {
        params: { scope },
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
  }, [layoutComponents, scope, updateLayoutComponentPositions]);

  return (
    <PageLayout withBackButton>
      <PageHeader
        title={SCOPE_LABEL[scope] || "Carregando..."}
        description={SCOPE_DESCRIPTION[scope]}
      >
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

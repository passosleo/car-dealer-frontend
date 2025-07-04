import React from "react";
import { twMerge } from "tailwind-merge";
import { DragAndDrop } from "../drag-and-drop/drag-and-drop";
import { DraggableList } from "../drag-and-drop/draggable-list";
import {
  DraggableStateSnapshot,
  DropResult,
  ResponderProvided,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "../loader/loader-circle";
import { SaveIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PageContentDraggableProps<T> = Omit<
  React.ComponentProps<"section">,
  "children" | "onDragEnd"
> & {
  items: T[];
  renderItem: (
    item: T,
    index: number,
    snapshot: DraggableStateSnapshot
  ) => React.ReactNode;
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  ignoreContainerClipping?: boolean;
  direction?: "horizontal" | "vertical";
  isLoading?: boolean;
  isDragDisabled?: boolean;
  enableFooter?: boolean;
  onClickSave?: () => void;
  onClickCancel?: () => void;
  hasUnsavedChanges?: boolean;
};

const PageContentDraggableInner = <T,>(
  {
    items,
    renderItem,
    className,
    isLoading,
    onDragEnd,
    isDragDisabled = false,
    isDropDisabled = false,
    isCombineEnabled = false,
    ignoreContainerClipping = false,
    direction = "vertical",
    enableFooter,
    onClickSave,
    onClickCancel,
    hasUnsavedChanges,
    ...props
  }: PageContentDraggableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <React.Fragment>
      <section
        {...props}
        ref={ref}
        className={twMerge(
          "flex-grow overflow-auto flex flex-col gap-4 w-full",
          className
        )}
      >
        <DragAndDrop
          onDragEnd={onDragEnd}
          isDropDisabled={isDropDisabled}
          isCombineEnabled={isCombineEnabled}
          ignoreContainerClipping={ignoreContainerClipping}
          direction={direction}
          droppableId="page-content-draggable"
        >
          <DraggableList
            isDragDisabled={isDragDisabled}
            items={items}
            renderItem={renderItem}
          />
        </DragAndDrop>
      </section>
      <AnimatePresence>
        {enableFooter && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="py-4 shrink-0 bottom-0 mt-auto flex gap-4 justify-end"
          >
            <Button
              variant="outline"
              className="max-w-48 w-full"
              onClick={onClickCancel}
            >
              <XIcon />
              Cancelar
            </Button>
            <Button
              className="relative max-w-48 w-full transition-all"
              onClick={onClickSave}
              disabled={isLoading || !hasUnsavedChanges}
            >
              {hasUnsavedChanges && (
                <span className="absolute top-[-8px] right-[-4px] h-4 w-4 rounded-full bg-destructive" />
              )}
              {isLoading ? <LoaderCircle color="secondary" /> : <SaveIcon />}
              Salvar
            </Button>
          </motion.footer>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

const PageContentDraggable = React.forwardRef(PageContentDraggableInner) as <T>(
  props: PageContentDraggableProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

(PageContentDraggable as React.FC).displayName = "PageContentDraggable";

export { PageContentDraggable };

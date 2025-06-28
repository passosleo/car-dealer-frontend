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
  isLoading?: boolean;
};

const PageContentDraggableInner = <T,>(
  {
    items,
    renderItem,
    className,
    isLoading,
    onDragEnd,
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
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={false}
          direction="vertical"
          droppableId="droppableId"
        >
          <DraggableList items={items} renderItem={renderItem} />
        </DragAndDrop>
      </section>
      <footer className="py-4 shrink-0 bottom-0 mt-auto flex gap-4 justify-end">
        <Button
          variant="outline"
          className="max-w-48 w-full"
          onClick={() => console.log("Button clicked")}
        >
          <XIcon />
          Cancelar
        </Button>
        <Button
          className="max-w-48 w-full"
          onClick={() => console.log("Button clicked")}
        >
          {isLoading ? <LoaderCircle color="secondary" /> : <SaveIcon />}
          Salvar
        </Button>
      </footer>
    </React.Fragment>
  );
};

const PageContentDraggable = React.forwardRef(PageContentDraggableInner) as <T>(
  props: PageContentDraggableProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

(PageContentDraggable as React.FC).displayName = "PageContentDraggable";

export { PageContentDraggable };

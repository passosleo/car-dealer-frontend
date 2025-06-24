import React from "react";
import {
  Draggable,
  DraggableProps,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { twMerge } from "tailwind-merge";

type Props<T> = Omit<DraggableProps, "draggableId" | "index" | "children"> & {
  items: T[];
  itemClassName?: string;
  draggableId?: string;
  renderItem: (
    item: T,
    index: number,
    snapshot: DraggableStateSnapshot
  ) => React.ReactNode;
  getDraggableStyle?: (snapshot: DraggableStateSnapshot) => React.CSSProperties;
};

export function DraggableList<T>({
  items,
  renderItem,
  itemClassName,
  draggableId,
  getDraggableStyle,
  ...props
}: Props<T>) {
  return (
    <>
      {items.map((item, index) => (
        <Draggable
          {...props}
          key={index}
          draggableId={draggableId || index.toString()}
          index={index}
        >
          {(dragable, snapshot) => {
            const draggableStyle = getDraggableStyle
              ? getDraggableStyle(snapshot)
              : undefined;
            return (
              <div
                ref={dragable.innerRef}
                {...dragable.draggableProps}
                {...dragable.dragHandleProps}
                className={twMerge("mb-3 select-none", itemClassName)}
                style={{
                  ...dragable.draggableProps.style,
                  ...draggableStyle,
                }}
              >
                {renderItem(item, index, snapshot)}
              </div>
            );
          }}
        </Draggable>
      ))}
    </>
  );
}

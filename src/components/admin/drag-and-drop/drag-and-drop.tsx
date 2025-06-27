import React from "react";
import {
  DragDropContext,
  DragDropContextProps,
  Droppable,
  DroppableProps,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { useClientSide } from "@/hooks/use-client-side";

type DragAndDropProps = DragDropContextProps &
  Omit<DroppableProps, "children"> & {
    getListStyle?: (snapshot: DroppableStateSnapshot) => React.CSSProperties;
  };

export function DragAndDrop({
  children,
  getListStyle,
  droppableId,
  type,
  mode,
  isDropDisabled,
  isCombineEnabled,
  direction,
  ignoreContainerClipping,
  renderClone,
  getContainerForClone,
  ...props
}: DragAndDropProps) {
  const { isClientSide } = useClientSide();
  return (
    <DragDropContext {...props}>
      {isClientSide ? (
        <Droppable
          droppableId={droppableId}
          type={type}
          mode={mode}
          isDropDisabled={isDropDisabled}
          isCombineEnabled={isCombineEnabled}
          direction={direction}
          ignoreContainerClipping={ignoreContainerClipping}
          renderClone={renderClone}
          getContainerForClone={getContainerForClone}
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle ? getListStyle(snapshot) : undefined}
            >
              {children}
            </div>
          )}
        </Droppable>
      ) : (
        <></>
      )}
    </DragDropContext>
  );
}

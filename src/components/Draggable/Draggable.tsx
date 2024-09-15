import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { IItems } from "../../App";
import { DraggableItem } from "./DraggableItem";

type Props = {
  items: any[];
  setItems: any;
  enable: boolean;
  selectItem: IItems | null;
  onOffSelectItem: () => void;
  onSelectItem: (item: any) => void;
};

export const Draggable = (props: Props) => {
  const { items, enable, setItems, selectItem, onOffSelectItem, onSelectItem } =
    props;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    setItems((items: any) => {
      return arrayMove(
        items,
        items.findIndex((it: any) => it.id === active.id),
        items.findIndex((it: any) => it.id === over.id)
      ) as IItems[];
    });
  };

  if (!enable) {
    return (
      <>
        {items.map((item) => (
          <DraggableItem
            item={item}
            key={item.id}
            enabled={enable}
            selectItem={selectItem}
            onSelectItem={onSelectItem}
            onOffSelectItem={onOffSelectItem}
          />
        ))}
      </>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {items.map((item) => (
          <DraggableItem
            item={item}
            key={item.id}
            enabled={enable}
            selectItem={selectItem}
            onSelectItem={onSelectItem}
            onOffSelectItem={onOffSelectItem}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

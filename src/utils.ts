import { colors } from '@atlaskit/theme';
import type { AuthorColors, Item, ItemMap } from './types';
import type { DraggableLocation } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
export const reorder = (
  list: any[],
  startIndex: number,
  endIndex: number
): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type ReorderItemMapArgs = {
  itemMap: ItemMap;
  source: DraggableLocation;
  destination: DraggableLocation;
};

type ReorderItemMapResult = {
  itemMap: ItemMap;
};

export const reorderItemMap = ({
  itemMap,
  source,
  destination
}: ReorderItemMapArgs): ReorderItemMapResult => {
  const current: Item[] = [...itemMap[source.droppableId]];
  const next: Item[] = [...itemMap[destination.droppableId]];
  const target: Item = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Item[] = reorder(current, source.index, destination.index);
    const result: ItemMap = {
      ...itemMap,
      [source.droppableId]: reordered
    };
    return {
      itemMap: result
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result: ItemMap = {
    ...itemMap,
    [source.droppableId]: current,
    [destination.droppableId]: next
  };

  return {
    itemMap: result
  };
};

export const getListBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean
): string => {
  if (isDraggingOver) {
    return colors.R50;
  }
  if (isDraggingFrom) {
    return colors.T50;
  }
  return colors.N30;
};

export const getItemBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
  authorColors: AuthorColors
) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return colors.N30;
  }

  return colors.N0;
};

export const getBorderColor = (
  isDragging: boolean,
  authorColors: AuthorColors
) => (isDragging ? authorColors.hard : 'transparent');

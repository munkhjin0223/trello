import { memo } from 'react';
import {
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot
} from 'react-beautiful-dnd';
import ItemComponent from './Item';
import {
  ListContainer,
  DropZone,
  ScrollContainer,
  Title,
  Wrapper
} from '../styles';
import type { Item } from '../types';

type Props = {
  listId?: string;
  listType?: string;
  items: Item[];
  title?: string;
  internalScroll?: boolean;
  scrollContainerStyle?: Object;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  style?: Object;
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean;

  useClone?: boolean;
};

type ItemListProps = {
  items: Item[];
};

const InnerList = memo(function InnerList(props: ItemListProps) {
  return (
    <>
      {props.items.map((item: Item, index: number) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(
            dragProvided: DraggableProvided,
            dragSnapshot: DraggableStateSnapshot
          ) => (
            <ItemComponent
              key={item.id}
              item={item}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
            />
          )}
        </Draggable>
      ))}
    </>
  );
});

type InnerListProps = {
  dropProvided: DroppableProvided;
  items: Item[];
  title?: string;
};

function InnerListContainer(props: InnerListProps) {
  const { items, dropProvided } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <ListContainer>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerList items={items} />
        {dropProvided.placeholder}
      </DropZone>
    </ListContainer>
  );
}

export default (props: Props) => {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    items,
    title,
    useClone
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <ItemComponent
                item={items[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : null
      }
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot
      ) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerListContainer
                items={items}
                title={title}
                dropProvided={dropProvided}
              />
            </ScrollContainer>
          ) : (
            <InnerListContainer
              items={items}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
};

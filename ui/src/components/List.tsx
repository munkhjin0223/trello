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
import { ListContainer, DropZone, Title, Wrapper } from '../styles';
import type { Author, Item } from '../types';

type Props = {
  listId?: string;
  listType?: string;
  items: Item[];
  title?: string;
  isDropDisabled?: boolean;
  style?: Object;
  authors: Author[];
};

type ItemListProps = {
  items: Item[];
  authors: Author[];
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
              authors={props.authors}
              key={item.id}
              item={item}
              isDragging={dragSnapshot.isDragging}
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
  authors: Author[];
};

function InnerListContainer(props: InnerListProps) {
  const { items, dropProvided, authors } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <ListContainer>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerList items={items} authors={authors} />
        {dropProvided.placeholder}
      </DropZone>
    </ListContainer>
  );
}

export default (props: Props) => {
  const {
    isDropDisabled,
    listId = 'LIST',
    listType,
    style,
    items,
    title,
    authors
  } = props;

  return (
    <Droppable droppableId={listId} type={listType}>
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
          <InnerListContainer
            items={items}
            authors={authors}
            title={title}
            dropProvided={dropProvided}
          />
        </Wrapper>
      )}
    </Droppable>
  );
};

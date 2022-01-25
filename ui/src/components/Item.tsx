import { memo } from 'react';
import type { Item } from '../types';
import type { DraggableProvided } from 'react-beautiful-dnd';
import {
  Author,
  Avatar,
  BlockItem,
  CloneBadge,
  Content,
  Footer,
  ItemContainer
} from '../styles';

type Props = {
  item: Item;
  isDragging: boolean;
  provided: DraggableProvided;
  isClone?: boolean;
  isGroupedOver?: boolean;
  style?: Object;
  index?: number;
};

function getStyle(provided: DraggableProvided, style: any) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style
  };
}

function ItemComponent(props: Props) {
  const { item, isDragging, isGroupedOver, provided, style, isClone, index } =
    props;

  return (
    <ItemContainer
      href={item.author.url}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      colors={item.author.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={item.id}
      data-index={index}
      aria-label={`${item.author.name} item ${item.content}`}
    >
      <Avatar src={item.author.avatarUrl} alt={item.author.name} />
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
      <Content>
        <BlockItem>{item.content}</BlockItem>
        <Footer>
          <Author colors={item.author.colors}>{item.author.name}</Author>
        </Footer>
      </Content>
    </ItemContainer>
  );
}

export default memo<Props>(ItemComponent);

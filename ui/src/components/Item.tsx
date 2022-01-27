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
import { authors } from '../data';

type Props = {
  item: Item;
  isDragging: boolean;
  provided: DraggableProvided;
  index?: number;
};

function ItemComponent(props: Props) {
  const { item, isDragging, provided, index } = props;

  const author = authors.find(a => a.id === item.authorId);

  return (
    <ItemContainer
      href={author.url}
      isDragging={isDragging}
      colors={author.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={provided.draggableProps.style}
      data-is-dragging={isDragging}
      data-testid={item.id}
      data-index={index}
      aria-label={`${author.name} item ${item.content}`}
    >
      <Avatar
        src={
          'https://i.picsum.photos/id/326/200/200.jpg?hmac=T_9V3kc7xrK46bj8WndwDhPuvpbjnAM3wfL_I7Gu6yA'
        }
        alt={author.name}
      />
      <Content>
        <BlockItem>{item.content}</BlockItem>
        <Footer>
          <Author colors={author.colors}>{author.name}</Author>
        </Footer>
      </Content>
    </ItemContainer>
  );
}

export default memo<Props>(ItemComponent);

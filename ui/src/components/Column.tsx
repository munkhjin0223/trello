import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { grid, borderRadius } from '../constants';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot
} from 'react-beautiful-dnd';
import List from './List';
import { AddNew, Title } from '../styles';
import type { Item } from '../types';
import { authors } from '../data';

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }: { isDragging: boolean }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.G50};
  }
`;

type Props = {
  title: string;
  items: Item[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
  id: string;
  addNew: (item: Item) => void;
};

export default ({
  title,
  items,
  index,
  isScrollable,
  isCombineEnabled,
  useClone,
  addNew,
  id
}: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title
              {...provided.dragHandleProps}
              aria-label={`${title} item list`}
            >
              {title}
            </Title>
          </Header>
          <List
            listId={id}
            listType='ITEM'
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : null
            }}
            items={items}
            internalScroll={isScrollable}
            isCombineEnabled={Boolean(isCombineEnabled)}
            useClone={Boolean(useClone)}
          />
          <AddNew
            onClick={() =>
              addNew({
                id: Math.random().toString(),
                author: authors[0],
                content: 'New',
                columnId: id
              })
            }
          >
            Add new
          </AddNew>
        </Container>
      )}
    </Draggable>
  );
};

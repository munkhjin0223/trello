import { Global, css } from '@emotion/react';
import { Component, Fragment } from 'react';
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
  DroppableProvided
} from 'react-beautiful-dnd';

import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import type { ItemMap, Item, Author } from '../types';
import Column from './Column';
import { reorder, reorderItemMap } from '../utils';
import { columns } from '../data';

const Container = styled.div`
  background-color: ${colors.B100};
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

type Props = {
  initial?: ItemMap;
  authors?: Author[];
};

type State = {
  itemMap: ItemMap;
  ordered: string[];
};

export default class Board extends Component<Props, State> {
  state: State = {
    itemMap: this.props.initial || {},
    ordered: Object.keys(this.props.initial || {})
  };

  boardRef?: HTMLElement;

  onDragEnd = (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) {
      return true;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return true;
    }

    // reordering column
    if (result.type === 'COLUMN') {
      const ordered: string[] = reorder(
        this.state.ordered,
        source.index,
        destination.index
      );

      this.setState({
        ordered
      });

      return true;
    }

    const data = reorderItemMap({
      itemMap: this.state.itemMap,
      source,
      destination
    });

    this.setState({ itemMap: data.itemMap });

    return true;
  };

  addNew = (item: Item) => {
    const itemMap = this.state.itemMap;

    this.setState({
      itemMap: {
        ...this.state.itemMap,
        [item.columnId]: [...itemMap[item.columnId], item]
      }
    });
  };

  render() {
    const { itemMap, ordered } = this.state;

    const board = (
      <Droppable
        droppableId='board'
        type='COLUMN'
        direction='horizontal'
        ignoreContainerClipping={false}
      >
        {(provided: DroppableProvided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key: string, index: number) => (
              <Column
                addNew={this.addNew}
                key={key}
                index={index}
                id={key}
                authors={this.props.authors}
                title={columns.find(c => c.id === key).name}
                items={itemMap[key]}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>{board}</DragDropContext>
        <Global
          styles={css`
            body {
              background: ${colors.B200};
            }
          `}
        />
      </Fragment>
    );
  }
}

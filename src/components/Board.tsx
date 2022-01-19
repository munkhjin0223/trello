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
import type { ItemMap, Item } from '../types';
import Column from './Column';
import { reorder, reorderItemMap } from '../utils';
import { columns } from '../data';

const ParentContainer = styled.div`
  height: ${({ height }: { height: string }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: ${colors.B100};
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

type Props = {
  initial: ItemMap;
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  useClone?: boolean;
};

type State = {
  itemMap: ItemMap;
  ordered: string[];
};

export default class Board extends Component<Props, State> {
  /* eslint-disable react/sort-comp */
  static defaultProps = {
    isCombineEnabled: false
  };

  state: State = {
    itemMap: this.props.initial,
    ordered: Object.keys(this.props.initial)
  };

  boardRef?: HTMLElement;

  onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow: string[] = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column: Item[] = this.state.itemMap[result.source.droppableId];
      const withItemRemoved: Item[] = [...column];
      withItemRemoved.splice(result.source.index, 1);
      const itemMap: ItemMap = {
        ...this.state.itemMap,
        [result.source.droppableId]: withItemRemoved
      };
      this.setState({ itemMap });
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
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

      return;
    }

    const data = reorderItemMap({
      itemMap: this.state.itemMap,
      source,
      destination
    });

    this.setState({ itemMap: data.itemMap });
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

    const {
      containerHeight,
      useClone,
      isCombineEnabled,
      withScrollableColumns
    } = this.props;

    const board = (
      <Droppable
        droppableId='board'
        type='COLUMN'
        direction='horizontal'
        ignoreContainerClipping={Boolean(containerHeight)}
        isCombineEnabled={isCombineEnabled}
      >
        {(provided: DroppableProvided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key: string, index: number) => (
              <Column
                addNew={this.addNew}
                key={key}
                index={index}
                id={key}
                title={columns.find(c => c.id === key).name}
                items={itemMap[key]}
                isScrollable={withScrollableColumns}
                isCombineEnabled={isCombineEnabled}
                useClone={useClone}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {containerHeight ? (
            <ParentContainer height={containerHeight}>{board}</ParentContainer>
          ) : (
            board
          )}
        </DragDropContext>
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

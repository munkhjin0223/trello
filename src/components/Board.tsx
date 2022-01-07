import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { getItems, reorder, move, getListStyle } from '../utils';
import Stage from './Stage';

export default function QuoteApp() {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState: any = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const newResult = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = newResult[sInd];
      newState[dInd] = newResult[dInd];

      setState(newState.filter(group => group.length));
    }
  };

  return (
    <div>
      <button
        type='button'
        onClick={() => {
          setState([...state, []]);
        }}
        style={{ marginRight: '30px' }}
      >
        Add new group
      </button>
      <button
        type='button'
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <br />
      <br />
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Stage
                      item={item}
                      index={index}
                      ind={ind}
                      state={state}
                      setState={setState}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

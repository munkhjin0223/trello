import { Draggable } from 'react-beautiful-dnd';
import { getItemStyle } from '../utils';

type Props = {
  item: any;
  index: number;
  ind: number;
  state: any;
  setState: (states: any[]) => void;
};

export default function Stage(props: Props) {
  const { item, index, state, ind, setState } = props;

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            {item.content}
            <button
              type='button'
              onClick={() => {
                const newState = [...state];
                newState[ind].splice(index, 1);
                setState(newState.filter(group => group.length));
              }}
            >
              delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

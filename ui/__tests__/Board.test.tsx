import { mount } from 'enzyme';
import Board from '../src/components/Board';
import Column from '../src/components/Column';
import { authors, columns, items } from '../static/data';
import { AddNew } from '../src/styles';
import { initialItemMap } from '../src/utils';
import { ItemMap } from '../src/types';

describe('Board component', () => {
  let initial: ItemMap = {};

  beforeEach(() => {
    initial = initialItemMap(columns, items, authors);
  });

  test('No destination', () => {
    const BoardComponent = mount(<Board />);

    const result = BoardComponent.find('DragDropContext').prop('onDragEnd');

    expect(result({} as any)).toBeTruthy();
  });

  test('Don`t move', () => {
    const BoardComponent = mount(<Board />);

    const result = BoardComponent.find('DragDropContext').prop('onDragEnd');

    expect(
      result({
        source: { droppableId: 1, index: 1 },
        destination: { droppableId: 1, index: 1 }
      } as any)
    ).toBeTruthy();
  });

  test('Type is COLUMN', () => {
    const BoardComponent = mount(<Board initial={initial} columns={columns} />);

    const result = BoardComponent.find('DragDropContext').prop('onDragEnd');

    expect(
      result({
        source: { droppableId: 1, index: 1 },
        destination: { droppableId: 1, index: 2 },
        type: 'COLUMN'
      } as any)
    ).toBeTruthy();
  });

  test('Type is ITEM', () => {
    const BoardComponent = mount(<Board initial={initial} columns={columns} />);

    const result = BoardComponent.find('DragDropContext').prop('onDragEnd');

    expect(
      result({
        source: { droppableId: 'column1', index: 1 },
        destination: { droppableId: 'column2', index: 1 },
        type: 'ITEM'
      } as any)
    ).toBeTruthy();
  });

  test('Type is addNew', () => {
    const BoardComponent = mount(<Board initial={initial} columns={columns} />);

    const result = BoardComponent.find(Column).at(0).prop('addNew');

    result({
      id: 'fakeId',
      content: 'content',
      authorId: authors[0].id,
      columnId: columns[0].id,
      author: authors[0]
    });
  });

  test('Type is addNew for Columnt', () => {
    const BoardComponent = mount(<Board initial={initial} columns={columns} />);

    const onClick = BoardComponent.find(Column)
      .at(0)
      .find(AddNew)
      .at(0)
      .prop('onClick');

    onClick({} as any);
  });
});

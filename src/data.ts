import { colors } from '@atlaskit/theme';
import type { Author, Item, ItemMap } from './types';

import finnImg from '../static/media/finn-min.png';
import bmoImg from '../static/media/bmo-min.png';
import princessImg from '../static/media/princess-min.png';
import jakeImg from '../static/media/jake-min.png';

const jake: Author = {
  id: '1',
  name: 'Jake',
  url: 'http://adventuretime.wikia.com/wiki/Jake',
  avatarUrl: jakeImg,
  colors: {
    soft: colors.Y50,
    hard: colors.N400A
  }
};

const BMO: Author = {
  id: '2',
  name: 'BMO',
  url: 'http://adventuretime.wikia.com/wiki/BMO',
  avatarUrl: bmoImg,
  colors: {
    soft: colors.G50,
    hard: colors.N400A
  }
};

const finn: Author = {
  id: '3',
  name: 'Finn',
  url: 'http://adventuretime.wikia.com/wiki/Finn',
  avatarUrl: finnImg,
  colors: {
    soft: colors.B50,
    hard: colors.N400A
  }
};

const princess: Author = {
  id: '4',
  name: 'Princess bubblegum',
  url: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
  avatarUrl: princessImg,
  colors: {
    soft: colors.P50,
    hard: colors.N400A
  }
};

type Column = { id: string; name: string };

export const columns: Column[] = [
  {
    id: 'column1',
    name: 'Column 1'
  },
  {
    id: 'column2',
    name: 'Column 2'
  },
  {
    id: 'column3',
    name: 'Column 3'
  },
  {
    id: 'column4',
    name: 'Column 4'
  }
];

export const items: Item[] = [
  {
    id: '1',
    content: 'Sometimes life is scary and dark',
    author: BMO,
    columnId: 'column1'
  },
  {
    id: '2',
    content:
      'Sucking at something is the first step towards being sorta good at something.',
    author: jake,
    columnId: 'column2'
  },
  {
    id: '3',
    content: "You got to focus on what's real, man",
    author: jake,
    columnId: 'column2'
  },
  {
    id: '4',
    content: 'Is that where creativity comes from? From sad biz?',
    author: finn,
    columnId: 'column3'
  },
  {
    id: '5',
    content: 'Homies help homies. Always',
    author: finn,
    columnId: 'column3'
  },
  {
    id: '6',
    content: 'Responsibility demands sacrifice',
    author: princess,
    columnId: 'column4'
  },
  {
    id: '7',
    content: "That's it! The answer was so simple, I was too smart to see it!",
    author: princess,
    columnId: 'column4'
  },
  {
    id: '8',
    content:
      "People make mistakes. It's all a part of growing up and you never really stop growing",
    author: finn,
    columnId: 'column1'
  },
  {
    id: '9',
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    author: finn,
    columnId: 'column4'
  },
  {
    id: '10',
    content: 'I should not have drunk that much tea!',
    author: princess,
    columnId: 'column3'
  },
  {
    id: '11',
    content: 'Please! I need the real you!',
    author: princess,
    columnId: 'column2'
  },
  {
    id: '12',
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    author: princess,
    columnId: 'column1'
  }
];

export const authors: Author[] = [jake, BMO, finn, princess];

const getByColumn = (column: Column, items: Item[]): Item[] =>
  items.filter((item: Item) => item.columnId === column.id);

export const authorItemMap: ItemMap = columns.reduce(
  (previous: ItemMap, column: Column) => ({
    ...previous,
    [column.id]: getByColumn(column, items)
  }),
  {}
);

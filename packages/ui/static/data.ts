import { colors } from '@atlaskit/theme';
import type { Author, Column, Item, ItemMap } from '../src/types';

const jake: Author = {
  id: '1',
  name: 'Jake',
  url: 'http://adventuretime.wikia.com/wiki/Jake',
  colors: {
    soft: colors.Y50,
    hard: colors.N400A
  }
};

const BMO: Author = {
  id: '2',
  name: 'BMO',
  url: 'http://adventuretime.wikia.com/wiki/BMO',
  colors: {
    soft: colors.G50,
    hard: colors.N400A
  }
};

const finn: Author = {
  id: '3',
  name: 'Finn',
  url: 'http://adventuretime.wikia.com/wiki/Finn',
  colors: {
    soft: colors.B50,
    hard: colors.N400A
  }
};

const princess: Author = {
  id: '4',
  name: 'Princess bubblegum',
  url: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
  colors: {
    soft: colors.P50,
    hard: colors.N400A
  }
};

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

export const authors: Author[] = [jake, BMO, finn, princess];

export const items: Item[] = [
  {
    id: '1',
    content: 'Sometimes life is scary and dark',
    authorId: '1',
    columnId: 'column1',
    author: authors.find(author => author.id === '1')
  },
  {
    id: '2',
    content:
      'Sucking at something is the first step towards being sorta good at something.',
    authorId: '1',
    columnId: 'column2',
    author: authors.find(author => author.id === '1')
  },
  {
    id: '3',
    content: "You got to focus on what's real, man",
    authorId: '1',
    columnId: 'column2',
    author: authors.find(author => author.id === '1')
  },
  {
    id: '4',
    content: 'Is that where creativity comes from? From sad biz?',
    authorId: '2',
    columnId: 'column3',
    author: authors.find(author => author.id === '2')
  },
  {
    id: '5',
    content: 'Homies help homies. Always',
    authorId: '2',
    columnId: 'column3',
    author: authors.find(author => author.id === '2')
  },
  {
    id: '6',
    content: 'Responsibility demands sacrifice',
    authorId: '2',
    columnId: 'column4',
    author: authors.find(author => author.id === '2')
  },
  {
    id: '7',
    content: "That's it! The answer was so simple, I was too smart to see it!",
    authorId: '3',
    columnId: 'column4',
    author: authors.find(author => author.id === '3')
  },
  {
    id: '8',
    content:
      "People make mistakes. It's all a part of growing up and you never really stop growing",
    authorId: '3',
    columnId: 'column1',
    author: authors.find(author => author.id === '3')
  },
  {
    id: '9',
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    authorId: '3',
    columnId: 'column4',
    author: authors.find(author => author.id === '3')
  },
  {
    id: '10',
    content: 'I should not have drunk that much tea!',
    authorId: '4',
    columnId: 'column3',
    author: authors.find(author => author.id === '4')
  },
  {
    id: '11',
    content: 'Please! I need the real you!',
    authorId: '4',
    columnId: 'column2',
    author: authors.find(author => author.id === '4')
  },
  {
    id: '12',
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    authorId: '4',
    columnId: 'column1',
    author: authors.find(author => author.id === '4')
  }
];

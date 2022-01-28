import { axiosInstance } from '../';
import { useEffect, useState } from 'react';
import Board from '../components/Board';
import { Item, ItemMap, Column } from '../types';

type Props = {
  initial?: ItemMap;
};

export default function BoardContainer(props: Props) {
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/')
      .then(({ data }) => {
        setAuthors(data.authors || []);
        setItems(data.items || []);
        setColumns(data.columns || []);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        console.log(e.message);
      });
  }, []);

  if (loading) {
    return <div>...</div>;
  }

  const getByColumn = (column: Column, items: Item[]): Item[] =>
    items.filter((item: Item) => item.columnId === column.id);

  const initial = columns.reduce(
    (previous: ItemMap, column: Column) => ({
      ...previous,
      [column.id]: getByColumn(column, items)
    }),
    {}
  );

  return <Board initial={initial} authors={authors} />;
}

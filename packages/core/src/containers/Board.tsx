import { axiosInstance } from '../';
import { useEffect, useState } from 'react';
import Board from '../components/Board';
import { initialItemMap } from '../utils';

export default function BoardContainer() {
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

  const initial = initialItemMap(columns, items, authors);

  return <Board initial={initial} columns={columns} />;
}

import { render } from 'react-dom';

import Board from './components/Board';
import { authorQuoteMap } from './data';

const rootElement = document.getElementById('root');

render(<Board initial={authorQuoteMap} />, rootElement);

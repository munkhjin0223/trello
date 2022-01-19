import '../static/reset.css';

import { render } from 'react-dom';
import Board from './components/Board';
import { authorItemMap } from './data';

const rootElement = document.getElementById('root');

render(<Board initial={authorItemMap} />, rootElement);

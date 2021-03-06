import '../static/reset.css';
import axios from 'axios';
import { render } from 'react-dom';
import Board from './containers/Board';

export const axiosInstance = axios.create({
  baseURL: 'https://mlhqhpxh27.execute-api.us-east-1.amazonaws.com/Prod/'
});

const rootElement = document.getElementById('root');

render(<Board />, rootElement);

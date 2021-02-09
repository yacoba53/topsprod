import React from 'react';
import ReactDom from 'react-dom';
import App from './src/App';
import './styles/styles.scss';

const rootElement = document.getElementById('root');
ReactDom.render(<App/>,rootElement);

import React from 'react';
import  ReactDOM  from 'react-dom';

import App from './App'

import './styles/mainstyles.css';
import { ContextProvider } from './utils/SocketContext';


ReactDOM.render(
       

        <App />
        , document.getElementById('root'));


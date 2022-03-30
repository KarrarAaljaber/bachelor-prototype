import React from 'react';
import  ReactDOM  from 'react-dom';

import App from './App'

import './styles/mainstyles.css';
import { ContextProvider } from './utils/SocketContext';

import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
        <Auth0Provider
        domain="http://localhost:3000/"
        clientId="i2NeiM7ImvG68zleRjHrBIS9CZtwzPQJ"
        redirectUri={window.location.origin}
    >
        <App />
        </Auth0Provider>
        , document.getElementById('root'));


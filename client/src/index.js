import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/index'
import { Provider } from 'react-redux';
import {GlobalProvider} from './context/GlobalContext'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


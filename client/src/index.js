import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/index'
import { Provider } from 'react-redux';
import {SearchProvider} from './context/SearchContext'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <SearchProvider>
        <App />
      </SearchProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


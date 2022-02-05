import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/index'
import { Provider } from 'react-redux';
import {StateProvider} from './context/stateContext'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <StateProvider>
        <App />
      </StateProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


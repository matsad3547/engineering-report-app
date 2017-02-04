import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App';
import { getReports } from './actions/getReports'
import { combinedReducers } from './reducers/'
import './index.css';

injectTapEventPlugin()

// const logger = createLogger()

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // applyMiddleware(thunk, logger),
  applyMiddleware(thunk)
                          )


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(getReports('reports'))

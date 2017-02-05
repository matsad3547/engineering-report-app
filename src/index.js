import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'

import injectTapEventPlugin from 'react-tap-event-plugin'

// import router from './App';
// import App from './App';
import { getReports } from './actions/getReports'
import { combinedReducers } from './reducers/'
import './index.css';

import App, { Home } from './App'
import NewReport from './containers/NewReport'
import ExistingReports from './containers/ExistingReports'

injectTapEventPlugin()


// const logger = createLogger()

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // applyMiddleware(thunk, logger),
  applyMiddleware(thunk))

const Root = () => (
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={Home}></IndexRoute>
      </Route>
      <Route path="/app" component={App} >
        <Route path="/new_report" component={NewReport} />
        <Route path="/existing_reports" component={ExistingReports} />
      </Route>
    </Router>
  </Provider>
)


// export caonst history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render( <Root />, document.getElementById('root'))

store.dispatch(getReports('reports'))

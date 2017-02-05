import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'

import Home from '../components/home/Home'
import App from './App'
import NewReport from './NewReport'
import ExistingReports from './ExistingReports'

// export const history = syncHistoryWithStore(browserHistory, store)


const Routes = () => (
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={Home}></IndexRoute>
      </Route>
      <Route path="/app" component={App} >
        <Route path="/app/new_report" component={NewReport} />
        <Route path="/app/existing_reports" component={ExistingReports} />
      </Route>
    </Router>
  </Provider>
)

export default Routes

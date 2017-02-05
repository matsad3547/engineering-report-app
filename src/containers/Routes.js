import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'

import Home from '../components/home/Home'
import DisplayReport from '../components/DisplayReport'
import App from '../components/App'
import NewReport from './NewReport'
import ExistingReports from './ExistingReports'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// export const history = syncHistoryWithStore(browserHistory, store)


const Routes = () => {

  return (
    
    <Provider store={store} >
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Home}>
            <IndexRoute component={Home}></IndexRoute>
          </Route>
          <Route path="/app" component={App} >
            <Route path="/app/new_report" component={NewReport} />
            <Route path="/app/existing_reports" component={ExistingReports} >
              <Route path="app/exist_reports/*" component={DisplayReport} />
            </Route>
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}

export default Routes

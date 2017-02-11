import React from 'react';
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import Home from '../components/Home/'
import DisplayReport from '../containers/DisplayReport'
import App from '../components/App/'
import NewReport from './NewReport'
import ExistingReports from './ExistingReports/'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { muiTheme } from '../data/'

export const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => {

  return (

    <Provider store={store} >
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Router history={history}>
          <Route path="/" component={Home}>
            <IndexRoute component={Home}></IndexRoute>
          </Route>
          <Route path="/app" component={App} >

            <Route path="/app/new_report" component={NewReport} />
            <Route path="/app/existing_reports" component={ExistingReports} />
            <Route path="/app/existing_reports/:report" component={DisplayReport} />

          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}

export default Routes

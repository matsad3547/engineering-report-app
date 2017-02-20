import React from 'react';
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// import { selectDataset } from '../utilities/auth'

import store from './store'
import Home from '../components/Home/'
import App from '../components/App/'
import CreateUser from '../containers/CreateUser'
import LoginUser from '../containers/LoginUser'
import DisplayReport from './DisplayReport'
import NewReport from './NewReport'
import ExistingReports from './ExistingReports/'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { muiTheme } from '../data/'

const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => {

  return (

    <Provider store={store} >
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Router history={history}>
          <Route path="/" component={Home}>

            <IndexRoute component={Home}></IndexRoute>

          </Route>
          <Route path="/login_user" component={LoginUser} ></Route>
          <Route path="/create_user" component={CreateUser} ></Route>
          <Route path="/app" component={App} >

            <Route path='/app/new_report' component={NewReport} />
            <Route path="/app/existing_reports" component={ExistingReports} />
            <Route path="/app/existing_reports/:report" component={DisplayReport} />

          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}

export default Routes

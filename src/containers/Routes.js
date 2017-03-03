import React from 'react'
import { Provider, connect } from 'react-redux'

import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { loggedIn } from '../utilities/auth'

import store from './store'
import Home from './Home'
import App from './App'
import LandingRoute from './LandingRoute'
import CreateUser from './CreateUser'
import LoginUser from './LoginUser'
import DisplayReport from './DisplayReport'
import NewReport from './NewReport'
import ExistingReports from './ExistingReports/'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { muiTheme } from '../data/'

loggedIn()

const history = syncHistoryWithStore(browserHistory, store)

const Routes = ({ path,
                  component }) => {

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

const mapStateToProps = state => {
  return {
    path: state.dataset === 'authorized' ? '/app' : '/',
    component: state.dataset === 'authorized' ? App : Home,
  }
}

const RouteMap = connect(
  mapStateToProps
  )(Routes)

export default Routes

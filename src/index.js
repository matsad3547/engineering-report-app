import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, browserHistory } from 'react-router'
import HttpsRedirect from 'react-https-redirect'
import dotenv from 'dotenv'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './index.css'

import store from './config/store'
import { routes } from './config/routes'
import { muiTheme } from './config/'

import { auth }  from './utils/firebase'
import { setData } from './utils/auth'

import getReports from './actions/getReports'
import getTeams from './actions/getTeams'
import getKeywords from './actions/getKeywords'
import getWeather from './actions/getWeather'

dotenv.config()

injectTapEventPlugin()

auth.onAuthStateChanged( user => {

  if(user) {
  //TODO ms Change once e-mail verification has been setup
  // console.log('user at auth state changed', user)
  // if(user && user.emailVerified) {
    store.dispatch(setData(user))
  }
  else {
    store.dispatch(getReports())
    store.dispatch(getKeywords())
    store.dispatch(getTeams())
    store.dispatch(getWeather())
  }
})

const history = syncHistoryWithStore(browserHistory, store)

const theme = getMuiTheme(muiTheme)

ReactDOM.render(
  <Provider store={store} >
    <HttpsRedirect>
      <MuiThemeProvider muiTheme={theme}>
        <Router
          history={history}
          routes={routes} />
      </MuiThemeProvider>
    </HttpsRedirect>
    </Provider>, document.getElementById('root'))

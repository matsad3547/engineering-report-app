import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, browserHistory } from 'react-router'
import HttpsRedirect from 'react-https-redirect'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './index.css'

import store from './config/store'
import { routes } from './config/routes'
import { muiTheme } from './config/'

import { auth }  from './utils/firebase'
import {
  setData,
  signOut,
} from './utils/auth'

import {
  // setDataMessage,
  setDataProperty,
 } from './actions/'

import getReports from './actions/getReports'
import getTeams from './actions/getTeams'
import getKeywords from './actions/getKeywords'
import getWeather from './actions/getWeather'

injectTapEventPlugin()

auth.onAuthStateChanged( user => {

  if(user && user.emailVerified) {
    store.dispatch(setData(user))
    browserHistory.replace('/app/')
  }
  else if (user && !user.emailVerified){
    // store.dispatch(setDataMessage(`Please go to your email account and follow the link to verify your email.`))
    store.dispatch(signOut())
    store.dispatch(setDataProperty({loading: false}))
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

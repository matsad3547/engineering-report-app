import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, browserHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './index.css'

import store from './config/store'
import { routes } from './config/routes'
import { muiTheme } from './config/'

import { checkAuthStatus } from './utils/auth'

injectTapEventPlugin()

store.dispatch(checkAuthStatus())

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store} >
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Router
          history={history}
          routes={routes} />
      </MuiThemeProvider>
    </Provider>, document.getElementById('root'))

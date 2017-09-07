import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'

import { loggedIn } from './utilities/auth'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux'
import store from './config/store'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { muiTheme } from './data/'

import { Router, browserHistory } from 'react-router'
import routes from './config/routes'

loggedIn()
injectTapEventPlugin()

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store} >
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Router
          history={history}
          routes={routes} />
      </MuiThemeProvider>
    </Provider>, document.getElementById('root'))

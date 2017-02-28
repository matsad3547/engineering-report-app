import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin'

import './index.css';

import Routes from './containers/Routes'

if ('serviceWorker in navigator' && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceWorker.js')
  })
}

injectTapEventPlugin()

ReactDOM.render( <Routes />, document.getElementById('root'))

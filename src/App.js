import React from 'react';
import { connect } from 'react-redux'

import { selectPage } from './actions'

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Tab, Tabs } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

import NewReport from './containers/NewReport'
import ExistingReports from './containers/ExistingReports'

let App = ({  pageDisplayed,
              dispatch }) => {

// console.log('reports at app:', reports);

  const handleTabClick = (value, e) => {
    e.preventDefault()
    dispatch(selectPage(value))
  }

  const handleSwipe = (value) => {
    dispatch(selectPage(value))
  }

  return (
    <MuiThemeProvider>
      <div className="app">
        <Tabs
          onChange={handleTabClick}
          value={pageDisplayed}>
          <Tab label="New Report" value={0} />
          <Tab label="Existing Reports" value={1} />
        </Tabs>
        <SwipeableViews
          index={pageDisplayed}
          onChangeIndex={handleSwipe}>
          <div>
            <NewReport />
          </div>
          <div>
            <ExistingReports />
          </div>
      </SwipeableViews>
    </div>
  </MuiThemeProvider>
  )
}

const mapStateToProps = state => {
  return {
    pageDisplayed: state.pageDisplayed
  }
}

App = connect(
  mapStateToProps,
  )(App)

export default App;

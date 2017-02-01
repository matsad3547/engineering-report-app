import React from 'react';
import { connect } from 'react-redux'

import { selectPage } from './actions'

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Tab, Tabs } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

import NewReport from './containers/NewReport'

let App = ({  pageDisplayed,
              dispatch }) => {

  const handleChange = (value, e) => {
    e.preventDefault()
    dispatch(selectPage(value))
  }

  return (
    <div className="app">
      <MuiThemeProvider>
        <Tabs onChange={handleChange}>
          <Tab label="New Report" value={0} />
          <Tab label="Existing Reports" value={1} />
        </Tabs>
      </MuiThemeProvider>
      <SwipeableViews
        index={pageDisplayed}
        onChangeIndex={handleChange}>
        <div>
          <NewReport />
        </div>
        <div>
          <ExistingReports />
        </div>
      </SwipeableViews>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    pageDisplayed: state.pageDisplayed,
  }
}

App = connect(
  mapStateToProps,
  )(App)

export default App;

let ExistingReports = () => {
  return (
    <div className="existingReports">
      <h3>Existing Reports Will Go Here</h3>
    </div>
  )
}

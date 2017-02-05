import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { selectPage } from '../actions'

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Tab, Tabs } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

import NewReport from './NewReport'
import ExistingReports from './ExistingReports'

// export const Home = () => (
//   <div>
//     <h1>Engineering Report App</h1>
//     <h2>This will be the landing page</h2>
//     <h3>It will contain:</h3>
//     <ul>
//       <li>Sign-In for Authorized Users</li>
//       <li>A Demo Version of the App</li>
//     </ul>
//     <Link to="/app" >Try out the App</Link>
//   </div>
// )

let App = ({  params,
              pageDisplayed,
              dispatch }) => {

console.log('params:', params);

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
        <Tabs>
          <Tab
            label="New Report"
            value={0}
            containerElement={<Link to="/app/new_report"/>} />
          <Tab
            label="Existing Reports"
            value={1}
            containerElement={<Link to="/app/existing_reports"/>} />
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

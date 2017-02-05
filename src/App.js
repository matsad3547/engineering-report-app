import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'


import { selectPage } from './actions'

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Tab, Tabs } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

import NewReport from './containers/NewReport'
import ExistingReports from './containers/ExistingReports'
// import { history } from './index'


export const Home = () => {
  return (
    <div>
      <h2>Engineering Report App</h2>
      <Link to="/app">Go to the app</Link>
    </div>
  )
}

// export const App = () => {
//   return (
//     <div>
//       <h3>I'm home</h3>
//     </div>
//   )
// }

// <Route pattern="/new report" component={NewReport} />
// <Route pattern="/existing reports" component={ExistingReports} />

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
  // console.log('router components:', Router, Link, Route, );

  return (

      <MuiThemeProvider>
        <div className="app">

          <Tabs
            onChange={handleTabClick}
            value={pageDisplayed}>
            <Tab
              label="New Report"
              value={0}
              containerElement={<Link to="/new_report"/>}
              />
            <Tab
              label="Existing Reports"
              value={1}
              containerElement={<Link to="/existing_reports" />}
              />
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


const NoMatch = () => (
  <div>
    <h2>Sorry, there is nothing here</h2>
  </div>
)

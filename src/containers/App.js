import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { selectPage } from '../actions'

import './App.css';

import { Tab, Tabs } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

// import NewReport from './NewReport'
// import ExistingReports from './ExistingReports'

const App = ({ children }) => {

  //  children ? children = children : children = Welcome

  console.log('children at App:', children);

// let App = ({  pageDisplayed,
//               dispatch }) => {

  // const handleTabClick = (value, e) => {
  //   e.preventDefault()
  //   dispatch(selectPage(value))
  // }
  //
  // const handleSwipe = (value) => {
  //   dispatch(selectPage(value))
  // }

  return (

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
        <SwipeableViews>
          { children }

        </SwipeableViews>
    </div>

  )
}
// 
// const Welcome = () => (
//   <div>
//     <h1>Welcome to Engineering Report App</h1>
//   </div>
// )

// <SwipeableViews
//   index={pageDisplayed}
//   onChangeIndex={handleSwipe}>
//   <div>
//     <NewReport />
//   </div>
//   <div>
//     <ExistingReports />
//   </div>
// </SwipeableViews>

const mapStateToProps = state => {
  return {
    pageDisplayed: state.pageDisplayed
  }
}
//
// App = connect(
//   mapStateToProps,
//   )(App)

export default App;

import React from 'react';
// import { connect } from 'react-redux'
import { Link } from 'react-router'

// import { selectPage } from '../actions'

import './App.css';

import { Tab, Tabs } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

// import NewReport from './NewReport'
// import ExistingReports from './ExistingReports'

const App = ({ children, location }) => {

  const pageDisplayed = 0

  console.log('location: ', location.pathname);

// let App = ({  pageDisplayed,
//               dispatch }) => {

  // const handleTabClick = (value, e) => {
  //   e.preventDefault()
  //   dispatch(selectPage(value))
  // }
  //
  const handleSwipe = (value) => {
    console.log('swipe value:', value);
    // dispatch(selectPage(value))
  }

  if (!!children) {

    return(

      <div className="app">
        <Tabs>
          <Tab
            label="New Report"
            value={0}
            containerElement={<Link to="/app/new_report"/>} />
          <Tab
            label="Existing Reports"
            value={0}
            containerElement={<Link to="/app/existing_reports"/>} />
        </Tabs>
        <SwipeableViews
          index={pageDisplayed}
          onChange={handleSwipe}
          >

          { children }

        </SwipeableViews>
      </div>
    )
  }
  return(

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
      <Welcome />
    </div>
  )

}

const Welcome = () => (
  <div className="home">
    <h1>Welcome to Engineering Report App</h1>
  </div>
)

// const mapStateToProps = (state, ownProps) => {
//   console.log('own props at app:', ownProps);
//   return {
//     pageDisplayed: state.pageDisplayed,
//     children: ownProps.children
//   }
// }
//
// App = connect(
//   mapStateToProps,
//   )(App)

export default App;

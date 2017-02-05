import React from 'react';
import { Link } from 'react-router'

import './App.css';

import { Tab, Tabs } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import Welcome from './Welcome'

const App = ({ children, location }) => {

  const pageDisplayed = location.pathname === '/app/new_report' ? 0 : 1

  if (!!children) {

    return(

      <div className="app">
        <Tabs
          value={pageDisplayed}>
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


export default App;

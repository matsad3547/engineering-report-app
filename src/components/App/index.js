import React from 'react';
import { Link } from 'react-router'

import './App.css';

import { Tab, Tabs } from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import SwipeableViews from 'react-swipeable-views'
import Welcome from '../Welcome'
// import * as FontIcon from 'material-design-icons'

const HomeButton = () => {
  const styles={
    icon: {
      fontSize: 20,
      color: '#FFE0B2',
    },
    button: {
      width: 40,
      height: 40,
      padding: 10,
    },
  }
  return (
    <IconButton
      containerElement={<Link to="/"/>}
      iconStyle={styles.icon}
      style={styles.button} >
      <FontIcon
        className="material-icons" >home</FontIcon>
      Home
    </IconButton>
  )
}

const TabMenu = ({ pageDisplayed }) => {

  return(
    <Tabs
      value={pageDisplayed}
      >
      <Tab
        label="New Report"
        value={1}
        containerElement={<Link to="/app/new_report"/>} />
      <Tab
        label="Existing Reports"
        value={2}
        containerElement={<Link to="/app/existing_reports"/>} />
    </Tabs>
  )
}

const App = ({ children, location, }) => {

  const pageDisplayed = location.pathname === '/app/new_report' ? 1 : 2

  const styles = {
    appBar: {
      height: 50,
    }
  }

  return(

    <div className="app">
      <AppBar
        iconElementLeft={<HomeButton/>}
        style={styles.appBar}
        />
      <TabMenu
        pageDisplayed={pageDisplayed}/>
      <SwipeableViews>

        { children || <Welcome /> }

      </SwipeableViews>
    </div>
  )
}


// export default muiThemeable()(App);
export default App;

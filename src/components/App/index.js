import React from 'react';

import { selectDataset } from '../../utilities/auth'
import './App.css';

import AppBar from 'material-ui/AppBar'
import SwipeableViews from 'react-swipeable-views'
import Welcome from '../Welcome'
import HomeButton from '../HomeButton'
import TabMenu from '../TabMenu'

const App = ({ children, location, }) => {

  // selectDataset()
  const dataset = selectDataset()
  console.log('dataset at app:', dataset);

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
        dataset={dataset}
        pageDisplayed={pageDisplayed}/>
      <SwipeableViews>

        { children || <Welcome /> }

      </SwipeableViews>
    </div>
  )
}

export default App;

import React from 'react'

import './Main.css';

import AppBar from 'material-ui/AppBar'
import SwipeableViews from 'react-swipeable-views'
// import Welcome from '../Welcome'
import HomeButton from '../HomeButton'
import TopMenu from '../TopMenu'
import TabMenu from '../TabMenu'

const Main = ({ authState,
                children,
                location,
                }) => {

  const pageDisplayed = location.pathname === '/new_report' ? 1 : 2

  const styles = {
    appBar: {
      height: 50,
    }
  }

  return(

    <div className="app">
      <AppBar
        iconElementLeft={ authState === 'authorized' ? <TopMenu /> : <HomeButton/>}
        style={styles.appBar}
        />
      <TabMenu
        pageDisplayed={pageDisplayed}/>
      <SwipeableViews>

        { children }

      </SwipeableViews>
    </div>
  )
}

export default Main

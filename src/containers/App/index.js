import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import SwipeableViews from 'react-swipeable-views'
import './App.css'

import HomeButton from '../../components/HomeButton'
import TopMenu from '../../components/TopMenu'
import TabMenu from '../../components/TabMenu'

const App = ({ authState,
                children,
                location,
                }) => {

  const pageDisplayed = location.pathname === '/app/new_report' ? 1 : 2

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

const mapStateToProps = (state, ownProps) => {
  return {
    authState: state.authState,
    children: ownProps.children,
    location: ownProps.location,
  }
}

export default connect(mapStateToProps)(App)

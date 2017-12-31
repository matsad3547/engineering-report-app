import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import SwipeableViews from 'react-swipeable-views'
import './App.css'

import HomeButton from '../../components/HomeButton'
import TabMenu from '../../components/TabMenu'
import Loading from '../../components/Loading'

import TopMenu from '../../containers/TopMenu'

const App = ({  team,
                children,
                location,
                loading,
              }) => {

  const pageDisplayed = location.pathname === '/app/new_report' ? 1 : 2

  const styles = {
    appBar: {
      height: 50,
    }
  }

  if(loading) {
    return (
      <Loading message={'Loading your data...'}/>
    )
  }
  return(
    <div className="app">
      <AppBar
        iconElementLeft={ team !== 'demo' ? <TopMenu /> : <HomeButton/>}
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

const mapStateToProps = (state, ownProps) => ({
  team: state.user.team,
  children: ownProps.children,
  location: ownProps.location,
  loading: state.data.loading,
})

App.propTypes = {
  team: PropTypes.string,
  children: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(mapStateToProps)(App)

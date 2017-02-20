import React from 'react'
import { browserHistory } from 'react-router'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

const BottomNav = () => {

  const goBack = e => {
    e.preventDefault()
    browserHistory.goBack()
  }

  return (
    <Paper zDepth={1}>
      <BottomNavigation>
        <BottomNavigationItem
          label="Back"
          icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
          onTouchTap={goBack} ></BottomNavigationItem>
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav

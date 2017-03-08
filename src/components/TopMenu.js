import React from 'react'
import { browserHistory } from 'react-router'

import { signOut } from '../utilities/auth'
import { muiTheme } from '../data/'

import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

const TopMenu = () => {

  const onClick = e => {
    e.preventDefault()
    signOut()
    browserHistory.push('/')
  }

  const styles={
    icon: {
      fontSize: 25,
      color: muiTheme.palette.primary3Color,
    },
    button: {
      width: 40,
      height: 40,
      paddingLeft: 10,
      paddingTop: 7,
    },
    anchor: {
      horizontal: 'left',
      vertical: 'bottom',
    },
    target: {
      horizontal: 'left',
      vertical: 'top',
    },
  }

  return (
    <IconMenu
      onClick={onClick}
      iconButtonElement={
        <IconButton
          style={styles.button}
          iconStyle={styles.icon}>
          <FontIcon className="material-icons">menu</FontIcon>
        </IconButton>}
      anchorOrigin={styles.anchor}
      targetOrigin={styles.target}>
      <MenuItem
        primaryText="Sign Out"/>
    </IconMenu>
  )
}

export default TopMenu

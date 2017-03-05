import React from 'react'
import { browserHistory } from 'react-router'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { muiTheme } from '../data/'

const BackButton = () => {

  const goBack = e => {
    e.preventDefault()
    browserHistory.push('/unauth')
  }

  const styles={
    icon: {
      fontSize: 40,
      color: muiTheme.palette.primary1Color,
    },
    button: {
      width: 60,
      height: 60,
      padding: 10,
    },
  }

  return (
    <IconButton
      onTouchTap={goBack}
      iconStyle={styles.icon}
      style={styles.button} >
      <FontIcon
        className="material-icons" >arrow_back</FontIcon>
      Back
    </IconButton>
  )
}

export default BackButton

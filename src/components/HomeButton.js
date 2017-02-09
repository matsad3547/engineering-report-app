import React from 'react';
import { Link } from 'react-router'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

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

export default HomeButton

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { signOut } from '../utils/auth'
import { muiTheme } from '../config/'

import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

const TopMenu = ({ admin, signOut }) => {

  const onClick = e => {
    e.preventDefault()
    signOut()
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
      iconButtonElement={
        <IconButton
          style={styles.button}
          iconStyle={styles.icon}>
          <FontIcon className="material-icons">menu</FontIcon>
        </IconButton>}
      anchorOrigin={styles.anchor}
      targetOrigin={styles.target}>
      { admin ? <MenuItem
        containerElement={<Link to="/app/set_keywords"/>}
        primaryText="Add/Remove Keywords"/> : ''}
      <MenuItem
        containerElement={<Link to="/app/about"/>}
        primaryText="About"/>
      <MenuItem
        onClick={onClick}
        primaryText="Sign Out"/>
    </IconMenu>
  )
}

const mapStateToProps = state => ({
  admin: state.user.admin,
})

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
})

TopMenu.propTypes = {
  admin: PropTypes.bool,
  signOut: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopMenu)

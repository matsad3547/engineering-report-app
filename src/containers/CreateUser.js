import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import { setUserProperty } from '../actions/'
import { createUser } from '../utils/auth'
import BackButton from '../components/BackButton'

import MessagePopUp from './MessagePopUp'

const CreateUser = ({ email,
                      displayName,
                      team,
                      password,
                      verifyPassword,
                      teams,
                      loading,
                      error,
                      setUserProperty,
                      createUser,
                    }) => {

  const userReady = verifyPassword === password && password.length >= 6 ? true : false

  const onChange = {
    team(e, k, p) {
      e.preventDefault()
      setUserProperty({team: p})
    },
    email(e) {
      e.preventDefault()
      setUserProperty({email: e.target.value})
    },
    displayName(e) {
      e.preventDefault()
      setUserProperty({displayName: e.target.value})
    },
    password(e) {
      e.preventDefault()
      setUserProperty({password: e.target.value})
    },
    verifyPassword(e) {
      e.preventDefault()
      setUserProperty({verifyPassword: e.target.value})
    },
  }

  const onClick = e => {
    e.preventDefault()
    if (userReady) {
      createUser()
      browserHistory.goBack()
    }
  }

  const display = password.length > 0 && password.length < 6 ? 'block' : 'none'

  const styles = {
    button: {
      height: 50,
      margin: 12,
    },
    password: {
      display,
    },
    menu: {
      backgroundColor: 'white',
      height: 30,
      width: 180,
      marginBottom: 20,
    },
    label: {
      fontSize: 15,
      lineHeight: 2,
      color: team === '' ? '#757575' : '#000',
    },
  }

  return (
    <div className="color">
      <div className="flexLayout login">
        <h3>Please Sign Up</h3>
        <DropDownMenu
          className="dropdown team"
          onChange={onChange.team}
          value={team === 'demo' ? '' : team}
          labelStyle={styles.label}
          style={styles.menu}
          >
          <MenuItem
            primaryText={'<none selected>'}
            label={'Choose a team'} value={''} />
          { teams.map( (t, i) => <MenuItem key={`team-${i}`} primaryText={t} label={t} value={t}/> )}

        </DropDownMenu>
        <input
          type="email"
          placeholder="E-mail Address"
          value={email}
          onChange={onChange.email}
          />
        <input
          type="text"
          placeholder="Name"
          value={displayName}
          onChange={onChange.displayName}
          />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange.password}
          />
        <input
          type="password"
          placeholder="Verify Password"
          value={verifyPassword}
          onChange={onChange.verifyPassword}
          />
        <p
          style={styles.password}
          >Please enter a password greater than 6 characters long</p>

        <RaisedButton
          disabled={!userReady}
          label="Create User"
          style={styles.button}
          className="reportButton"
          onClick={onClick}
          />
      </div>
      <BackButton />
      <MessagePopUp />
    </div>
  )
}

const mapStateToProps = state => {

  const { email,
          displayName,
          team,
          password,
          verifyPassword,
          teams,
        } = state.user

  const { loading, error, } = state.data

  return {
    email,
    displayName,
    team,
    password,
    verifyPassword,
    teams,
    loading,
    error,
  }
}

const mapDispatchToProps = dispatch => ({
  setUserProperty: property => dispatch(setUserProperty(property)),
  createUser: () => dispatch(createUser()),
})

CreateUser.propTypes = {
  email: PropTypes.string,
  displayName: PropTypes.string,
  team: PropTypes.string,
  password: PropTypes.string,
  verifyPassword: PropTypes.string,
  teams: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  setUserProperty: PropTypes.func,
  createUser: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUser)

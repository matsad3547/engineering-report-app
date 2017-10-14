import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import { setUserProperty, setTeamProperty } from '../actions/'
import { createTeam } from '../utils/auth'
import BackButton from '../components/BackButton'

const CreateTeam = ({ email,
                      displayName,
                      team,
                      password,
                      verifyPassword,
                      userDispatch,
                      setUserProperty,
                      setNewTeamProperty,
                      createTeam,
                    }) => {

  const userReady = (verifyPassword === password && password.length >= 6) ? false : true

  const onChange = {

    team(e) {
      e.preventDefault()
      setTeamProperty({team: e.target.value})
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
    if (!userReady) {
      createTeam()
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
      marginBottom: 6,
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
        <h3>Please Create a Team</h3>
        <h4>You will be the new Team Admin</h4>

        <input
          type="text"
          placeholder="Team Name"
          value={team}
          onChange={onChange.team}
          />
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
          disabled={userReady}
          label="Create Team"
          style={styles.button}
          className="reportButton"
          onClick={onClick}
          />
      </div>
      <BackButton />
    </div>
  )
}

const mapStateToProps = state => {

  const {
    email,
    displayName,
    password,
    verifyPassword,
  } = state.user

  const { team } = state.teamConfig

  return {
    email,
    displayName,
    team,
    password,
    verifyPassword,
  }
}

const mapDispatchToProps = dispatch => ({
  setUserProperty: property => dispatch(setUserProperty(property)),
  setTeamProperty: property => dispatch(setTeamProperty(property)),
  createTeam: () => dispatch(createTeam()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTeam)

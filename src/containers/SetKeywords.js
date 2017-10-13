import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import { setUserProperty, clearUserData } from '../actions/'
import { createUser } from '../utils/auth'
import BackButton from '../components/BackButton'

const SetKeywords = ({ email,
                      displayName,
                      newTeam,
                      password,
                      verifyPassword,
                      userDispatch,
                      setUserProperty,
                      createTeam,
                    }) => {

  const userReady = (verifyPassword === password && password.length >= 6) ? false : true

  const onChange = {

    newTeam(e) {
      e.preventDefault()
      setUserProperty({newTeam: e.target.value})
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
      // createTeam()
      browserHistory.push('/app/set_keywords')
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
      color: newTeam === '' ? '#757575' : '#000',
    },
  }

  return (
    <div className="color">
      <div className="flexLayout login">
        <h3>Please set your team's evaluation criteria</h3>

        <input
          type="text"
          placeholder="Team Name"
          value={newTeam}
          onChange={onChange.newTeam}
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

  const { email,
          displayName,
          newTeam,
          password,
          verifyPassword,
        } = state.user

  return {
    email,
    displayName,
    newTeam,
    password,
    verifyPassword,
  }
}

const mapDispatchToProps = dispatch => ({
  setUserProperty: property => dispatch(setUserProperty(property)),
  // createTeam: () => dispatch(createTeam()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetKeywords)

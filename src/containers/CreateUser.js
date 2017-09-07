import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import { setUserData, clearUserData } from '../actions/'
import { createUser } from '../utils/auth'
import BackButton from '../components/BackButton'

const CreateUser = ({ email,
                      password,
                      verified,
                      userDispatch,
                      clearUserData,
                        }) => {

  const userReady = (verified === password && password.length >= 6) ? false : true

  const output = {
    email,
    password,
    verified,
  }

  const onChange = {

    email(e) {
      e.preventDefault()
      output.email = e.target.value
      userDispatch(output)
    },
    password(e) {
      e.preventDefault()
      output.password = e.target.value
      userDispatch(output)
    },
    verify(e) {
      e.preventDefault()
      output.verified = e.target.value
      userDispatch(output)
    }
  }

  const onClick = e => {
    e.preventDefault()
    if (!userReady) {
      createUser(email, password)
      clearUserData()
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
      display: display
    }
  }

  return (
    <div className="color">
      <div className="flexLayout login">
        <h3>Please Sign Up</h3>
        <input
          type="email"
          placeholder="E-mail Address"
          value={email}
          onChange={onChange.email}
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
          value={verified}
          onChange={onChange.verify}
          />
        <p
          style={styles.password}
          >Please enter a password greater than 6 characters long</p>

        <RaisedButton
          disabled={userReady}
          label="Create User"
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

  return {
    email: state.user.email,
    password: state.user.password,
    verified: state.user.verified,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    userDispatch: output => dispatch(setUserData(output)),
    clearUserData: () => dispatch(clearUserData()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUser)

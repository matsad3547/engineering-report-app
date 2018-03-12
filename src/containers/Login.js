import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'

import {
  setUserProperty,
  clearUserData,
  setDataError,
} from '../actions/'
import { signIn } from '../utils/auth'

import MessagePopUp from './MessagePopUp'

import BackButton from '../components/BackButton'
import ErrorPopUp from '../components/ErrorPopUp'

const Login = ({  email,
                  password,
                  signInErr,
                  setUserProperty,
                  clearUserData,
                  signIn,
                  resetError,
                }) => {

  const onChange = {
    email(e) {
      e.preventDefault()
      setUserProperty({email: e.target.value})
    },
    password(e) {
      e.preventDefault()
      setUserProperty({password: e.target.value})
    },
  }

  const onClick = e => {
  e.preventDefault()
  if (password.length > 6) {
    signIn(email, password)
    clearUserData()
    }
  }

  const userReady = (password.length >= 6) ? false : true

  const display = password.length > 0 && password.length < 6 ? 'block' : 'none'

  const styles = {
    button: {
      height: 50,
      margin: 12,
    },
    password: {
      display: display
    },
    link: {
      paddingTop: '2em',
      color: 'gray',
    },
  }

  return (
    <div className="color ">
      <div className="flexLayout login">
        <h3>Please Log In</h3>
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

        <RaisedButton
          disabled={userReady}
          label="Log In"
          style={styles.button}
          className="reportButton"
          onClick={onClick}
          />
        <Link
          to="/reset_password"
          style={styles.link}
          >Need to reset your password?</Link>
      </div>
      <BackButton />
      <ErrorPopUp
        error={signInErr}
        message={`There was an error signing in: ${signInErr}`}
        clearError={resetError}
        />
      <MessagePopUp />
    </div>
  )
}

const mapStateToProps = state => ({
  email: state.user.email,
  password: state.user.password,
  signInErr: state.data.error.signInErr ? state.data.error.signInErr.message : '',
})

const mapDispatchToProps = dispatch => ({
  setUserProperty: property => dispatch(setUserProperty(property)),
  clearUserData: () => dispatch(clearUserData()),
  signIn: (email, password) => dispatch(signIn(email, password)),
  resetError: () => dispatch(setDataError({signInErr: null}))
})

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  signInError: PropTypes.string,
  setUserProperty: PropTypes.func,
  clearUserData: PropTypes.func,
  signIn: PropTypes.func,
  resetError: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)

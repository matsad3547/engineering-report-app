import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import {
  setUserProperty,
  setDataError,
} from '../actions/'

import { getResetPasswordEmail } from '../utils/auth'

import MessagePopUp from './MessagePopUp'
import ErrorPopUp from './ErrorPopUp'

import BackButton from '../components/BackButton'

const ResetPassword = ({  email,
                          setUserProperty,
                          getResetPasswordEmail,
                        }) => {

  const onChange = {
    email(e) {
      e.preventDefault()
      setUserProperty({email: e.target.value})
    },
  }

  const onClick = e => {
  e.preventDefault()
  if (email.includes('@')) {
      getResetPasswordEmail(email)
    }
  }

  const emailReady = !email.includes('@')

  const styles = {
    button: {
      height: 50,
      margin: 12,
    },
  }

  return (
    <div className="color ">
      <div className="flexLayout login">
        <h3>Enter the e-mail address from your account to reset your password</h3>
        <input
          type="email"
          placeholder="E-mail Address"
          value={email}
          onChange={onChange.email}
          />
        <RaisedButton
          disabled={emailReady}
          label="Reset Password"
          style={styles.button}
          className="reportButton"
          onClick={onClick}
          />
      </div>
      <BackButton />
      <MessagePopUp />
      <ErrorPopUp
        errorKey="resetErr"
        message="There was an error resetting your password"
        />
    </div>
  )
}

const mapStateToProps = state => ({
  email: state.user.email,
})

const mapDispatchToProps = dispatch => ({
  setUserProperty: property => dispatch(setUserProperty(property)),
  getResetPasswordEmail: email =>
  dispatch(getResetPasswordEmail(email)),
  resetError: () => dispatch(setDataError({signInErr: null}))
})

ResetPassword.propTypes = {
  email: PropTypes.string,
  setUserProperty: PropTypes.func,
  getResetPasswordEmail: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { setUserProperty, clearUserData } from '../actions/'
import { signIn } from '../utils/auth'
import BackButton from '../components/BackButton'

const Login = ({  email,
                  password,
                  setUserProperty,
                  clearUserData,
                  signIn,
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
    }
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
      </div>
      <BackButton />
      
    </div>
  )
}

const mapStateToProps = state => {

  const { email, password } = state.user

  return {
    email,
    password,
  }
}

const mapDispatchToProps = dispatch => ({
  setUserProperty: property => dispatch(setUserProperty(property)),
  clearUserData: () => dispatch(clearUserData()),
  signIn: (email, password) => dispatch(signIn(email, password)),
})

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  setUserProperty: PropTypes.func,
  clearUserData: PropTypes.func,
  signIn: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)

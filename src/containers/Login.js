import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
// import Login from '../components/Login'
import { setUserData, clearUserData } from '../actions/'
import { signIn } from '../utilities/auth'
import BackButton from '../components/BackButton'

const Login = ({  email,
                  password,
                  userDispatch,
                  clearUserData,
                    }) => {

  const output = {
    email,
    password,
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
  }

  const onClick = e => {
  e.preventDefault()
  if (password.length > 6) {
    signIn(email, password)
    clearUserData()
    browserHistory.push('app/')
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

  return {
    email: state.user.email,
    password: state.user.password,
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
)(Login)

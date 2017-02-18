import React from 'react'
import { connect } from 'react-redux'
import { signIn } from '../utilities/auth'
import { setUserData, clearUserData } from '../actions/'
import RaisedButton from 'material-ui/RaisedButton'

let LoginUser = ({ email,
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
    <div className="home textInput login">
      <h3>Please Log In</h3>
      <input
        type="text"
        placeholder="E-mail Address"
        value={email}
        onChange={onChange.email}
        />
      <input
        type="text"
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

LoginUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginUser)

export default LoginUser

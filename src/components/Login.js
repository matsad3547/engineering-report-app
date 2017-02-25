import React from 'react'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { signIn } from '../utilities/auth'
// import BottomNav from './BottomNav'
import BackButton from './BackButton'

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
    browserHistory.push('/app')
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
      <BackButton />
    </div>

  )
}

export default Login

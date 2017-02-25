import React from 'react'
import { browserHistory } from 'react-router'
import { createUser } from '../utilities/auth'
import RaisedButton from 'material-ui/RaisedButton'
import BackButton from './BackButton'

const SignUp = ({ email,
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
        <input
          type="text"
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

export default SignUp

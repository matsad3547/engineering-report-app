import React from 'react'
import { connect } from 'react-redux'
import { setUserData, clearUserData } from '../actions/'
import createUser from '../utilities/auth'
import RaisedButton from 'material-ui/RaisedButton'

let CreateUser = ({ email,
                    password,
                    userDispatch,
                    clearUserData,
                      }) => {

  const styles = {
    button: {
      height: 50,
      margin: 12,
    }
  }

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
    console.log('email:', email, 'password:', password);
    createUser(email, password)
    // clearUserData()
  }

  return (
    <div className="home">
      <div className="textInput login">
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

          label="Create User"
          style={styles.button}
          className="reportButton"
          onClick={onClick}
          />

      </div>
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

CreateUser = connect(
  mapStateToProps,
  mapDispatchToProps,
    )(CreateUser)

export default CreateUser

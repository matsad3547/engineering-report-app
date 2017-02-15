import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { createUser } from '../utilities/auth'

const CreateUser = ({email, password, userDispatch}) => {

  const styles = {
    button: {
      height: 50,
      margin: 12,
    }
  }

  // const output = {
  //   email,
  //   password,
  // }

  // const onChange = {
  //   // email(e) {
  //   //   e.preventDefault()
  //   //   output.email = e.target.value
  //   //   userDispatch(output)
  //   // },
  //   password(e) {
  //     e.preventDefault()
  //     output.password = e.target.value
  //     userDispatch(output)
  //   },
  // }

  const onClick = e => {
    e.preventDefault()
    let email, password
    console.log(email);
    // createUser(email, password)
  }

  return (
    <div className="home">
      <div className="textInput">
        <input type="text"
          placeholder="Email"
          value={email}
          />
        <input type="text"
          placeholder="Password"
          value={password}
          />

        <RaisedButton

          label="Create User"
          style={styles.button}
          className="reportButton"
          />

      </div>
    </div>
  )
}

export default CreateUser

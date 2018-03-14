import React from 'react'
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'

import { version } from '../config/'

import MessagePopUp from '../containers/MessagePopUp'
import ErrorPopUp from '../containers/ErrorPopUp'

const UnAuth = () => {

  const style = {
    margin: 12,
    width: 250,
  }

  return (
    <div className="color flexLayout home">
      <h1>Engineering Report App</h1>
      <br />
      <RaisedButton
        label="Create a Team"
        containerElement={<Link to="/create_team" ></Link>}
        style={style}
        />
      <RaisedButton
        label="Sign Up"
        containerElement={<Link to="/create_user" ></Link>}
        style={style}
        />
      <RaisedButton
        label="Log In"
        containerElement={<Link to="/login_user" ></Link>}
        style={style} />
      <RaisedButton
        label="Try the Demo"
        containerElement={<Link to="app/" ></Link>}
        style={style}/>
      <p className="footer">version {version}</p>
      <MessagePopUp />
      <ErrorPopUp
        errorKey="authErr"
        message="There was an authentication error"
        />
    </div>
  )
}

export default UnAuth

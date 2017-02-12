import React from 'react';
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'

const style = {
  margin: 12,
  width: 200,
};

const Home = () => {

  return (
    <div className="home">
      <h1>Engineering Report App</h1>
      <br />
      <RaisedButton
        label="Sign Up"
        style={style} />
      <RaisedButton
        label="Log In"
        style={style} />
      <RaisedButton
        label="Try the Demo"
        containerElement={<Link to="/app" >
          Try out the App</Link>}
          style={style}/>
    </div>
  )
}


export default Home

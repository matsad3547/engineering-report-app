import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const SignUp = () => {
  return (
    <div className="home">
        <div className="textInput">
          <input type="text"
            placeholder="Email"
            value={model}
            onChange={onChange.model}
            />
        </div>
    </div>
  )
}

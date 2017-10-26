import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Loading = ({message}) => (

  <div className="loading">
    <h3>{message}</h3>
    <CircularProgress
      className="spinner"
      thickness={6  }
      size={75}
      />
  </div>
)

export default Loading

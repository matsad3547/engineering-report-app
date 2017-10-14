import React from 'react'
import { connect } from 'react-redux'
import Loading from '../components/Loading'

const Welcome = ({loading}) => {
  if (loading) {
    return (
      <Loading message={'Loading...'}/>
    )
  }
  return (
    <div className="color flexLayout welcome">
      <h1>Welcome to Engineering Report App</h1>
      <h4>Now let's get to work!</h4>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.data.loading
})

export default connect(mapStateToProps)(Welcome)

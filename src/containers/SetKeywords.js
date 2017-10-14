import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import { setUserProperty, clearUserData } from '../actions/'
import BackButton from '../components/BackButton'

const SetKeywords = ({ email,
                      displayName,
                      newTeam,
                      password,
                      verifyPassword,
                      userDispatch,
                      setUserProperty,
                      createTeam,
                    }) => {

  const userReady = (verifyPassword === password && password.length >= 6) ? false : true

  const onChange = {

    newTeam(e) {
      e.preventDefault()
      setUserProperty({newTeam: e.target.value})
    },
    email(e) {
      e.preventDefault()
      setUserProperty({email: e.target.value})
    },
    displayName(e) {
      e.preventDefault()
      setUserProperty({displayName: e.target.value})
    },
    password(e) {
      e.preventDefault()
      setUserProperty({password: e.target.value})
    },
    verifyPassword(e) {
      e.preventDefault()
      setUserProperty({verifyPassword: e.target.value})
    },
  }

  const onClick = e => {
    e.preventDefault()
    if (!userReady) {
      // createTeam()
      browserHistory.push('/app/set_keywords')
    }
  }

  const display = password.length > 0 && password.length < 6 ? 'block' : 'none'

  const styles = {
    button: {
      height: 50,
      margin: 12,
    },
    password: {
      display,
    },
    menu: {
      backgroundColor: 'white',
      height: 30,
      width: 180,
      marginBottom: 6,
    },
    label: {
      fontSize: 15,
      lineHeight: 2,
      color: newTeam === '' ? '#757575' : '#000',
    },
  }

  return (
    <div className="color">
      <div className="flexLayout login">
        <h3>Please set your team's evaluation criteria keywords</h3>



        <RaisedButton

          label="Save"
          style={styles.button}
          className="reportButton"
          onClick={onClick}
          />
      </div>
      <BackButton />
    </div>
  )
}

const mapStateToProps = state => {

  const { keyword, keywords } = state.team

  return {
    keyword,
    keywords,
  }
}

const mapDispatchToProps = dispatch => ({
  setUserProperty: property => dispatch(setUserProperty(property)),
  // saveKeywords: () => dispatch(saveKeywords()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetKeywords)

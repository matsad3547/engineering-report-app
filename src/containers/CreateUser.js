import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import { setUserProperty } from '../actions/'
import { getTeams } from '../actions/getReports'
import { createUser } from '../utils/auth'
import BackButton from '../components/BackButton'

const CreateUser = ({ email,
                      displayName,
                      team,
                      password,
                      verifyPassword,
                      teams,
                      userDispatch,
                      setUserProperty,
                      clearUserData,
                    }) => {

  getTeams()

  const userReady = (verifyPassword === password && password.length >= 6) ? false : true

  const onChange = {
    team(e, k, p) {
      e.preventDefault()
      setUserProperty({team: p})
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
      createUser()
      // clearUs erData()
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
      display,
    },
    menu: {
      backgroundColor: 'white',
      height: 30,
      width: 180,
      marginBottom: 20,
    },
    label: {
      fontSize: 15,
      lineHeight: 2,
      color: team === '' ? '#757575' : '#000',
    },
  }

  return (
    <div className="color">
      <div className="flexLayout login">
        <h3>Please Sign Up</h3>
        <DropDownMenu
          className="dropdown team"
          onChange={onChange.team}
          value={team}
          labelStyle={styles.label}
          style={styles.menu}
          >
          <MenuItem primaryText={''} label={'Choose a team'} value={''} />
          { teams.map( (t, i) => <MenuItem key={`team-${i}`} primaryText={t} label={t} value={t}/> )}

        </DropDownMenu>
        <input
          type="email"
          placeholder="E-mail Address"
          value={email}
          onChange={onChange.email}
          />
        <input
          type="text"
          placeholder="Name"
          value={displayName}
          onChange={onChange.displayName}
          />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange.password}
          />
        <input
          type="password"
          placeholder="Verify Password"
          value={verifyPassword}
          onChange={onChange.verifyPassword}
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

const mapStateToProps = state => {

  const { email,
          displayName,
          team,
          password,
          verifyPassword,
          teams,
        } = state.user

  return {
    email,
    displayName,
    team,
    password,
    verifyPassword,
    teams,
  }
}

const mapDispatchToProps = dispatch => ({
  setUserProperty: property => dispatch(setUserProperty(property)),
  // clearUserData: () => dispatch(clearUserData()),
  // getTeams: () => dispatch(getTeams()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUser)
//
// <MenuItem primaryText={2} label={2} value={2}/>
// <MenuItem primaryText={3} label={3} value={3}/>
// <MenuItem primaryText={4} label={4} value={4}/>

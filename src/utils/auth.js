import database, { auth }  from './firebase'
import { browserHistory } from 'react-router'

import { getReports } from '../actions/getReports'
import { getTeams } from '../actions/getTeams'
import { getKeywords} from '../actions/getKeywords'
import {
  setUserData,
  clearUserData,
  setDataError,
  setTeamProperty,
} from '../actions/'

export const signIn = (email, password) => {

  return dispatch => {
    auth.signInWithEmailAndPassword(email, password)
    .then( jwt => {
      localStorage.setItem('jwt', JSON.stringify(jwt))
      dispatch(setData())
    })
    .catch( err => {
      console.error('There was a error signing in:', err.message)
      dispatch(setDataError({signInErr: err}))
    })
  }
}

export const checkAuthStatus = () => {
  //TODO get token?
  //TODO verify token is the same?
  //TODO check auth status
}

export const setData = () => {
  return dispatch => {

    const token = localStorage.getItem('jwt')

    if (token){
      const {
        displayName,
        email,
        uid,
      } = JSON.parse(token)

      database.ref(`users/${uid}`)
      .once('value', snap => {
        const {
          team,
          admin,
          approved,
        } = snap.val()
        dispatch(setUserData({
            displayName,
            email,
            uid,
            admin,
            approved,
          })
        )
        dispatch(setTeamProperty({team,}))
      })
      .then( () => {
        dispatch(getReports())
        dispatch(getKeywords())
      })
      .catch( err => {
        console.error('There was a error retrieving your user data:', err.message)
        dispatch(setDataError({userErr: err}))
      })
    }
    else {
      dispatch(getReports())
      dispatch(getKeywords())
    }
    dispatch(getTeams())
  }
}

export const signOut = () => {
  return dispatch => {
    auth.signOut()
    .then( () => {
      dispatch(clearUserData())
    })
    .then( () => localStorage.removeItem('jwt') )
    .then( () => {
      dispatch(setData())
      browserHistory.push('/')
    })
    .catch( err => {
      console.error('There was a error signing out:', err.message)
      dispatch(setDataError({signOutErr: err}))
    })
  }
}

export const createUser = () => {

  return (dispatch, getState) => {
    const { displayName,
            email,
            password,
            team,
          } = getState().user

    auth.createUserWithEmailAndPassword(email, password)
    .then( user => {
      user.updateProfile({
        displayName,
      })
      const { uid } = user
      const userInfo = {}
      userInfo[`users/${uid}`] = {
        team,
        admin: false,
        approved: false,
      }
      database.ref()
      .update(userInfo)
      .then( () => {
        database.ref('users')
        .orderByChild('team')
        .equalTo(team)
        .once('value', snap => {
          const members = snap.val()
          const adminUID = Object.keys(members)
                            .filter( k => members[k].admin === true)[0]
          const adminEmail = members[adminUID].email

          console.log('admin:', adminUID, '\nteam:', team, '\nemail:', adminEmail);
          //TODO figure out how to notify admin of new user
        })
      })
    })
    .then( () => {
      dispatch(clearUserData())
      auth.signOut()
    })
    .catch( err => {
      console.error('There was a error creating an account:', err.message)
      dispatch(setDataError({signOutErr: err}))
    })
  }
}

export const createTeam = () => {

  return (dispatch, getState) => {
    const {
      displayName,
      email,
      password,
      teams,
    } = getState().user

    const { team } = getState().team

    auth.createUserWithEmailAndPassword(email, password)
      .then( user => {

      const { uid, email } = user

      const adminInfo = {}
      adminInfo[`/${uid}`] = {
        team,
        admin: true,
        approved: true,
        email,
      }

      const teamInfo = {}
      teamInfo[`/${team}`] = {
        keywords: ['ph'],
        'test reports': {
          '000': 'ph',
        },
      }

      const teamNames = [...teams, team]

      database.ref('users')
      .update(adminInfo)
      database.ref('teams')
      .update(teamInfo)

      dispatch(clearUserData())
      dispatch(setTeamProperty({team: ''}))

      user.updateProfile({
        displayName,
      })
      .then( () => auth.onAuthStateChanged( jwt => {
          localStorage.setItem('jwt', JSON.stringify(jwt))
          dispatch(setData())
          browserHistory.push('/set_keywords')
        })
      )
      .then( () => {
        database.ref()
        .update({'team_names': teamNames})
      })
    })
    .catch( err => {
      console.error('There was a error creating an account:', err.message)
      dispatch(setDataError({signOutErr: err}))
      dispatch(clearUserData())
    })
  }
}

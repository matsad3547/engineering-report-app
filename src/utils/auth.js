import database, { auth }  from './firebase'
import { browserHistory } from 'react-router'

import getReports from '../actions/getReports'
import getTeams from '../actions/getTeams'
import getKeywords from '../actions/getKeywords'
import getWeather from '../actions/getWeather'
import getTeammates from '../actions/getTeammates'

import {
  setUserData,
  clearUserData,
  setDataProperty,
  setDataError,
  setDataMessage,
  setTeamProperty,
} from '../actions/'

export const signIn = (email, password) => {

  return dispatch => {

    dispatch(setDataProperty({loading: true}))

    auth.signInWithEmailAndPassword(email, password)

    //TODO ms change stuff here to update user object
    // .then( user => {
    //   console.log('user:', user)
    //   user.sendEmailVerification()
    //   .catch( err => console.error(err))
    // })
    // .then( user => {
    //   console.log('updating e-mail verified');
    //   user.updateProfile({
    //     displayName: 'Matt',
    //   })
    // })
    // .then( () => browserHistory.push('/') )
    .catch( err => {
      console.error('There was a error signing in:', err.message)
      dispatch(setDataProperty({loading: false}))
      dispatch(setDataError({signInErr: err}))
    })
  }
}

export const signOut = () => {

  return dispatch => {

    auth.signOut()
    .then( () => dispatch(clearUserData()) )
    .then( () => {
      browserHistory.push('/')
    })
    .catch( err => {
      console.error('There was a error signing out:', err.message)
      dispatch(setDataProperty({loading: false}))
      dispatch(setDataError({signOutErr: err}))
    })
  }
}

export const userKey = Object.keys(window.localStorage)
                        .filter( k => k.startsWith('firebase:authUser') )[0]

export const setData = user => {

  return dispatch => {

    dispatch(setDataProperty({loading: true}))

    const {
      email,
      uid,
    } = user

    database.ref(`users/${uid}`)
    .once('value', snap => {
      const {
        team,
        admin,
        approved,
        displayName,
      } = snap.val()

      dispatch(setUserData({
          displayName,
          email,
          uid,
          admin,
          approved,
          team,
        })
      )
    })
    .then( () => {
      dispatch(getReports())
      dispatch(getKeywords())
      dispatch(getTeams())
      dispatch(getWeather())
      dispatch(getTeammates())
    })
    .catch( err => {
      console.error('There was a error retrieving your user data:', err.message)
      dispatch(setDataError({userErr: err}))
      dispatch(setDataProperty({loading: false}))
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

      const { uid } = user
      const userInfo = {}
      userInfo[`users/${uid}`] = {
        team,
        admin: false,
        approved: true,
        displayName,
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
          // TODO ms figure out how to notify admin of new user
        })
      })
      user.updateProfile({
        displayName,
      })
      console.log('updated user:', user);
      user.sendEmailVerification()
      .then( () => dispatch(setDataMessage(`You have been added to ${team}.  Please go to your email account and follow the link to verify your email.`)))
      .catch( err => {
        console.error(err)
        dispatch(setDataError({createUserErr: err.message}))
      })

    })
    .catch( err => {
      console.error('There was a error creating an account:', err.message)
      dispatch(setDataError({createUserErr: err.message}))
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

    const { team } = getState().teamConfig

    auth.createUserWithEmailAndPassword(email, password)
      .then( user => {

      const { uid, email } = user

      const adminInfo = {}
      adminInfo[`/${uid}`] = {
        team,
        admin: true,
        approved: true,
        email,
        displayName,
      }

      const teamInfo = {}
      teamInfo[`/${team}`] = {
        keywords: ['ph'],
        'test reports': {
          '000': {
            config: 'ph',
            metricValues: 'ph',
            uid: 'ph',
            notes: 'ph',
          },
        },
      }

      const teamNames = [...teams, team]

      database.ref('users')
      .update(adminInfo)
      database.ref('teams')
      .update(teamInfo)
      database.ref()
      .update({'team_names': teamNames})

      dispatch(setTeamProperty({team: ''}))

      user.updateProfile({
        displayName,
      })
      console.log('updated user:', user);
      user.sendEmailVerification()
      .then( () => dispatch(setDataMessage(`You just created ${team}.  Please go to your email account and follow the link to verify your email then sign in to complete your team configuration.`)))
      .catch( err => {
        console.error(err)
        dispatch(setDataError({createUserErr: err.message}))
      })
    })
    .catch( err => {
      console.error('There was a error creating an account:', err.message)
      dispatch(setDataError({signOutErr: err}))
      dispatch(clearUserData())
    })
  }
}

const getResetPasswordEmail = () => {
  return (dispatch, getState) => {
    const {
      email,
    } = getState().user

    dispatch(setDataMessage(`A password reset email has been sent to ${email}`))
  }
}

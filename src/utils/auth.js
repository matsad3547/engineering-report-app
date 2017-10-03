import database, { auth }  from './firebase'
import store from '../config/store'
import { getReports, getFilteredReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'
import { setUserData, clearUserData } from '../actions/'

export const signIn = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
  //TODO get auth token
  //TODO load auth token into local storage
  // localStorage.setItem('token', fbToken)
  loggedIn()
}

export const checkAuthStatus = () => {
  //TODO get token?
  //TODO verify token is the same?
  //TODO check auth status
}

export const loggedIn = () => {
  let team
  const { dispatch } = store
  auth.onAuthStateChanged( user => {
    if (user) {
      const { displayName,
              email,
              uid,
            } = user
      database.ref(`users/${uid}`)
        .once('value', snap => {
        const {
          team,
          admin,
          approved,
        } = snap.val()

        dispatch(setUserData({
            team,
            displayName,
            email,
            uid,
            admin,
            approved,
          })
        )
      })
      .then( () => {
        dispatch(getReports())
        dispatch(getFilteredReports(team))
        dispatch(getKeywords())
      })
    }
    else {
      dispatch(setUserData({
          team: 'demo',
        })
      )
      dispatch(getReports())
      dispatch(getKeywords())
    }
  })
}

export const signOut = () => {
  localStorage.setItem('token', null)
  auth.signOut()
}

export const createUser = () => {

  const { dispatch, getState } = store

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
      let userInfo = {}
      userInfo[`users/${uid}`] = {
        team,
        admin: false,
        approved: false,
      }
      database.ref()
        .update(userInfo)
      dispatch(clearUserData())
    })
    .catch( err => console.error('Oops!', err.message) )
}

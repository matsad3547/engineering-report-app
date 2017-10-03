import database, { auth }  from './firebase'
import store from '../config/store'
import { getReports, getFilteredReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'
import { setAuthState, setUserData, clearUserData } from '../actions/'

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
          admin,
          approved,
        } = snap.val()
        team = snap.val().team
        console.log('team:', team);

        dispatch(setUserData({
            team,
            displayName,
            email,
            uid,
            admin,
            approved,
          })
        )
        dispatch(getReports(team))
        dispatch(getFilteredReports(team))
        dispatch(getKeywords(team))
      })

      // team = 'Test Team'
    }
    else {
      team = 'demo'
    }
    dispatch(getReports(team))
    dispatch(getFilteredReports(team))
    dispatch(getKeywords(team))
    // dispatch(setAuthState(team))
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

import { auth } from './firebase'
import store from '../config/store'
import { getReports, getFilteredReports, getTeams } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'
import { setAuthState, setUserData } from '../actions/'

export const signIn = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
  //get auth token
  //load auth token into local storage
  loggedIn()
}

export const checkAuthStatus = () => {
  //get token?
  //verify token is the same?
  //check auth status
}

export const loggedIn = () => {
  let team
  auth.onAuthStateChanged( user => {
    if (user) {
      const { displayName,
              email,
              uid,
            } = user
      console.log('user:', user);
      team = 'authorized'
      store.dispatch(setUserData({team, displayName, email, uid, }))
    }
    else {
      team = 'demo'
    }
    store.dispatch(getReports(team))
    store.dispatch(getFilteredReports(team))
    store.dispatch(getKeywords(team))
    store.dispatch(setAuthState(team))
    store.dispatch(getTeams())
  })
}

export const signOut = () => {
  //delete auth token from local storage
  auth.signOut()
}

export const createUser = (email, pw) => {
  auth.createUserWithEmailAndPassword(email, pw)
    .then(
      //update user properties
    )
    .catch( err => console.error('Oops!', err.message) )
}

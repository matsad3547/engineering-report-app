import { auth } from './firebase'
import store from '../config/store'
import { getReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'
import { setAuthState, setUserData } from '../actions/'

export const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)

export const loggedIn = () => {
  let authState, uid, displayName, team

  auth.onAuthStateChanged( user => {
    if (user) {
      console.log('user:', user);
      authState = 'authorized'
      displayName = user.displayName
      uid = user.uid
      store.dispatch(setUserData({displayName, uid, team}))
    }
    else {
      authState = 'demo'
    }
    store.dispatch(getReports(authState))
    store.dispatch(getKeywords(authState))
    store.dispatch(setAuthState(authState))
  })
}

export const signOut = () => auth.signOut()

export const createUser = (email, pw) => {
  auth.createUserWithEmailAndPassword(email, pw)
    .then()
    .catch( err => console.error('Oops!', err.message) )
}

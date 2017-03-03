import { auth } from './firebase'
import store from '../containers/store'
import { getReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'
import { setAuthState } from '../actions/'

export const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)

export const loggedIn = () => {
  let authState = ''
  auth.onAuthStateChanged( user => {
    if (user) {
      authState = 'authorized'
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
    .catch( err => console.log('Oops!', err.message) )
}

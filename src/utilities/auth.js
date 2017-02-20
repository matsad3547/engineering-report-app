import { auth } from './firebase'
import store from '../containers/store'
import { getReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'
import { setDataset } from '../actions/'

export const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)

export const selectDataset = () => {
  let dataset = ''
  auth.onAuthStateChanged( user => {
    // console.log('firebase user:', user);
    if (user) {
      dataset = 'authorized'
    }
    else {
      dataset = 'demo'
    }
    store.dispatch(getReports(dataset))
    store.dispatch(getKeywords(dataset))
    store.dispatch(setDataset(dataset))
  })
}

export const signOut = () => auth.signOut()

export const createUser = (email, pw) => {
  auth.createUserWithEmailAndPassword(email, pw)
    .then()
    .catch( err => console.log('Oops!', err.message) )
}

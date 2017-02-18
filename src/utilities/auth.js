import { auth } from './firebase'
// import { clearUserData } from '../actions/'
// import { connect } from 'react-redux'

// console.log(auth)

export const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)

// auth.createUserWithEmailAndPassword(email, pass)

auth.onAuthStateChanged(firebaseUser => {
  // console.log('firebaseUser', firebaseUser);
})

export const signOut = () => auth.signOut()

export const createUser = (email, pw) => {
  auth.createUserWithEmailAndPassword(email, pw)
    .then()
    .catch( err => console.log('Oops!', err.message) )
}

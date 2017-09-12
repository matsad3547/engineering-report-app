import { auth } from './firebase'
// import admin from 'firebase-admin'
import store from '../config/store'
import { getReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'
import { setAuthState } from '../actions/'

// console.log('firebase admin:', admin);

// var admin = require("firebase-admin");

const serviceAccount = require('../config/engineering-report-app-firebase-adminsdk-yjkbx-d999ddf7b9.json')


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://engineering-report-app.firebaseio.com"
// });

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
    .catch( err => console.error('Oops!', err.message) )
}

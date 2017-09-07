import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCzQgzAPMCqMRE8w_PFYZtfpLtAJGSXYUg",
  authDomain: "engineering-report-app.firebaseapp.com",
  databaseURL: "https://engineering-report-app.firebaseio.com",
  storageBucket: "engineering-report-app.appspot.com",
  messagingSenderId: "4716609803"
}

// console.log(firebase.initializeApp)
const database = firebase
  .initializeApp(config)
  .database()
  // .ref()
  // .child('testTeam')

export const auth = firebase
  .auth()

export default database

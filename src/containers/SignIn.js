import { auth } from './Firebase'

console.log(auth)

auth.signInWithEmailAndPassword(email, pass)

auth.createUserWithEmailAndPassword(email, pass)

auth.onAuthStateChanged(firebaseUser => {
  console.log('firebaseUser', firebaseUser);
})

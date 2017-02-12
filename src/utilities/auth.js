import { auth } from './Firebase'

console.log(auth)

auth.signInWithEmailAndPassword(email, pass)

// auth.createUserWithEmailAndPassword(email, pass)

auth.onAuthStateChanged(firebaseUser => {
  console.log('firebaseUser', firebaseUser);
})

export const signOut = () => auth.signOut()

export const createUser = (email, pw) => {
  auth.createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch( (err) = console.log('Oops!', err) )
}

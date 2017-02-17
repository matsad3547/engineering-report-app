import { requestKeywords, receiveKeywords, keywordError } from './index'
import database from '../utilities/firebase'

export const getKeywords = path => {
  console.log('get keywords called');
  return dispatch => {
    dispatch(requestKeywords())
    return database.ref(`${path}/keywords`).once('value', snap => {
      const keywords = snap.val()
      dispatch(receiveKeywords(keywords))
      })
    .catch( err => {
      console.log('an error occurred while fetching keywords from the database:', err);
      dispatch(keywordError(err))
    })
  }
}

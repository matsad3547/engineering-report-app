import { requestKeywords, receiveKeywords, keywordError } from './index'
import database from '../utils/firebase'

export const getKeywords = team => {

  return dispatch => {
    dispatch(requestKeywords())
    return database.ref(`${team}/keywords`).once('value', snap => {
      const keywords = snap.val()
      dispatch(receiveKeywords(keywords))
      })
    .catch( err => {
      console.error('an error occurred while fetching keywords from the database:', err);
      dispatch(keywordError(err))
    })
  }
}

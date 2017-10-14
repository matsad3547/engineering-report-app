import { receiveKeywords, setDataProperty, setDataError } from './index'
import database from '../utils/firebase'

export const getKeywords = () => {

  return (dispatch, getState) => {
    const { team } = getState().team
    dispatch(setDataProperty({loaded: false}))
    dispatch(setDataProperty({loading: true}))
    return database.ref(`teams/${team}/keywords`)
            .once('value', snap => {
      const keywords = snap.val()
      dispatch(receiveKeywords(keywords))
      dispatch(setDataProperty({loaded: true}))
      dispatch(setDataProperty({loading: false}))
      })
    .catch( err => {
      console.error('an error occurred while fetching keywords from the database:', err);
      dispatch(setDataError({keywordsErr: err}))
      dispatch(setDataProperty({loading: false}))
    })
  }
}

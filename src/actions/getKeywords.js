import { receiveKeywords, setDataProperty, setDataError } from './index'
import database from '../utils/firebase'

export const getKeywords = () => {

  return (dispatch, getState) => {
    const { team } = getState().user

    return database.ref(`teams/${team}/keywords`)
            .once('value', snap => {
      const keywords = snap.val()
                        .filter( k => k !== 'ph' )
      dispatch(receiveKeywords(keywords))
      })
    .catch( err => {
      console.error('an error occurred while fetching keywords from the database:', err);
      dispatch(setDataError({keywordsErr: err}))
      dispatch(setDataProperty({loading: false}))
    })
  }
}

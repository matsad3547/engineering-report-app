import {
  receiveKeywords,
  setDataProperty,
  setDataError,
} from './index'

import database from '../utils/firebase'

import { browserHistory } from 'react-router'

const getKeywords = () => {

  return (dispatch, getState) => {

    const {
      team,
      admin,
    } = getState().user

    return database.ref(`teams/${team}/keywords`)
            .once('value', snap => {
      const keywords = snap.val()
                        .filter( k => k !== 'ph' )
      if(admin && keywords.length === 0) {
        browserHistory.push('/set_keywords')
      }
      dispatch(receiveKeywords(keywords))
      dispatch(setDataProperty({loading: false}))
      })
    .catch( err => {
      console.error('an error occurred while fetching keywords from the database:', err);
      dispatch(setDataError({keywordsErr: err}))
      dispatch(setDataProperty({loading: false}))
    })
  }
}

export default getKeywords

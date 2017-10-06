import {  receiveReports,
          setDataProperty,
          setDataError,
        } from './index'

import database from '../utils/firebase'

export const getReports = (n = 10, allReports = false) => {
console.log('all reports:', allReports);
  return (dispatch, getState) => {
    const { team, uid, admin } = getState().user
    dispatch(setDataProperty({dataIsFresh: false}))
    dispatch(setDataProperty({loading: true}))
    if (team === 'demo' || (admin && allReports)) {
      return database.ref(`teams/${team}/test reports`)
              .limitToLast(n)
              .once('value', snap => {
        const reports = snap.val()

        dispatch(receiveReports(reports, n, allReports,))
        dispatch(setDataProperty({loading: false}))
        dispatch(setDataProperty({dataIsFresh: true}))
      })
      .catch( err => {
        console.error('An error occured while fetching reports from the database:', err);
        dispatch(setDataError({reportErr: err}))
        dispatch(setDataProperty({loading: false}))
      })
    }
    else {
      return database.ref(`teams/${team}/test reports`)
              .orderByChild('uid')
              .equalTo(uid)
              .limitToLast(n)
              .once('value', snap => {
        const reports = snap.val()

        dispatch(receiveReports(reports, n, allReports))
        dispatch(setDataProperty({loading: false}))
        dispatch(setDataProperty({dataIsFresh: true}))
      })
      .catch( err => {
        console.error('An error occured while fetching reports from the database:', err);
        dispatch(setDataError({reportErr: err}))
        dispatch(setDataProperty({loading: false}))
      })
    }
  }
}

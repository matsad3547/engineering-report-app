import { requestReports, receiveReports, reportError } from './index'
import database from '../utils/firebase'

export const getReports = ref => {

  return dispatch => {
    dispatch(requestReports());
    return database.ref(`${ref}/test reports`).once('value', snap => {
      const reports = snap.val()
      dispatch(receiveReports(reports))
      })
    .catch( err => {
      console.log('An error occured while fetching reports from the database:', err);
      dispatch(reportError(err))
    })
  }
}

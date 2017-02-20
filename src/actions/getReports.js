import { requestReports, receiveReports, reportError } from './index'
import database from '../utilities/firebase'

export const getReports = ref => {

  const urlKey = `${ref}/test reports`

  console.log('get reports called');
  return dispatch => {
    dispatch(requestReports());
    return database.ref(urlKey).once('value', snap => {
      const reports = snap.val()
      dispatch(receiveReports(reports))
      })
    .catch( err => {
      console.log('An error occured while fetching reports from the database:', err);
      dispatch(reportError(err))
    })
  }
}

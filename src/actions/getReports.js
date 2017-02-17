import { requestReports, receiveReports, reportError } from './index'
import database from '../utilities/firebase'

export const getReports = (ref, action) => {

  let urlKey = ''
  if (ref === 'reports') {
    urlKey = 'demo/test reports'
  }
  else {
    urlKey = 'demo/test reports/' + ref
  }
  console.log('get reports called');
  return dispatch => {
    dispatch(requestReports());
    return database.ref(urlKey).once('value', snap => {
      const reports = snap.val()
      dispatch(receiveReports(reports))
      })
    .catch( err => {
      console.log('An error occured while querying the database:', err);
      dispatch(reportError(err))
    })
  }
}

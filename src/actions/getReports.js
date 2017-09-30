import { requestReports, receiveReports, reportError } from './index'
import database from '../utils/firebase'

export const getReports = team => {

  return (dispatch, getState) => {
    const { displayName, uid, admin } = getState().user
    dispatch(requestReports())
    return database.ref(`${team}/test reports`).once('value', snap => {
      const reports = snap.val()
      dispatch(receiveReports(reports))
      })
    .catch( err => {
      console.log('An error occured while fetching reports from the database:', err);
      dispatch(reportError(err))
    })
  }
}
export const getFilteredReports = team => {

  return (dispatch, getState) => {
    const { displayName, uid, admin } = getState().user
    dispatch(requestReports())
    if (team === 'demo' || admin) {
      return database.ref(`${team}/test reports`).once('value', snap => {
        const reportsFiltered = snap.val()
        console.log('reports at get reports:', reportsFiltered, '\nadmin?', admin, '\nuid:', uid, '\nteam:', team)
      })
      .catch( err => {
        console.log('An error occured while fetching reports from the database:', err);
        dispatch(reportError(err))
      })
    }
    else {
      return database.ref(`${team}/test reports`).orderByChild('uid').equalTo(uid).once('value', snap => {
        const reportsFiltered = snap.val()
        console.log('reports at get reports:', reportsFiltered, '\nadmin?', admin, '\nuid:', uid, '\nteam:', team);
      })
      .catch( err => {
        console.log('An error occured while fetching reports from the database:', err);
        dispatch(reportError(err))
      })
    }
  }
}

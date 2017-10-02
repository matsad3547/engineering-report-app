import {  requestReports,
          receiveReports,
          reportError,
          setDataProperty,
          setDataError,
        } from './index'
import database from '../utils/firebase'

export const getReports = team => {

  return (dispatch, getState) => {
    const { displayName, uid, admin } = getState().user
    dispatch(setDataProperty({loaded: false}))
    dispatch(setDataProperty({loading: true}))
    return database.ref(`${team}/test reports`)
            .once('value', snap => {
      const reports = snap.val()
      dispatch(receiveReports(reports))
      dispatch(setDataProperty({loading: false}))
      dispatch(setDataProperty({loaded: true}))
      })
    .catch( err => {
      console.log('An error occured while fetching reports from the database:', err);
      dispatch(setDataError({reportErr: err}))
    })
  }
}

export const getFilteredReports = (team, n = 10) => {

  return (dispatch, getState) => {
    const { displayName, uid, admin } = getState().user
    dispatch(setDataProperty({loaded: false}))
    dispatch(setDataProperty({loading: true}))
    if (team === 'demo' || admin) {
      return database.ref('demo/test reports')
              .limitToLast(n)
              .once('value', snap => {
        const reportsFiltered = snap.val()
        console.log('reports at get reports:', reportsFiltered, '\nadmin?', admin, '\nuid:', uid, '\nteam:', team)
        // dispatch(receiveReports(reports))
        // dispatch(setDataProperty({loading: false}))
        // dispatch(setDataProperty({loaded: true}))
      })
      .catch( err => {
        console.error('An error occured while fetching reports from the database:', err);
        dispatch(setDataError({reportErr: err}))
      })
    }
    else {
      return database.ref(`${team}/test reports`)
              .orderByChild('uid')
              .equalTo(uid)
              .limitToLast(n)
              .once('value', snap => {
        const reportsFiltered = snap.val()
        console.log('reports at get reports:', reportsFiltered, '\nadmin?', admin, '\nuid:', uid, '\nteam:', team);
        // dispatch(receiveReports(reports))
        // dispatch(setDataProperty({loading: false}))
        // dispatch(setDataProperty({loaded: true}))
      })
      .catch( err => {
        console.error('An error occured while fetching reports from the database:', err);
        dispatch(setDataError({reportErr: err}))
      })
    }
  }
}

export const getTeams = () => {

  return dispatch => {
    dispatch(setDataProperty({loaded: false}))
    dispatch(setDataProperty({loading: true}))
    return database.ref()
            .once('value', snap => {
      const teams = Object.keys(snap.val())
                      .filter( t => t !== 'demo' )
      console.log('teams:', teams);
      // dispatch(setDataProperty({loading: false}))
      // dispatch(setDataProperty({loaded: true}))
      })
    .catch( err => {
      console.error('An error occured while fetching teams from the database:', err);
      dispatch(setDataError({reportErr: err}))
    })
  }
}

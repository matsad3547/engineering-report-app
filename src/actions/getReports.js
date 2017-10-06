import {  receiveReports,
          setDataProperty,
          setDataError,
        } from './index'

import database from '../utils/firebase'

export const getReports = (n = 10) => {
  console.log('n:', n);

  return (dispatch, getState) => {
    const { team, uid, admin } = getState().user
    dispatch(setDataProperty({dataIsFresh: false}))
    dispatch(setDataProperty({loading: true}))
    if (team === 'demo' || admin) {
      return database.ref(`teams/${team}/test reports`)
              .limitToLast(n)
              .once('value', snap => {
        const reports = snap.val()
        console.log('reports at get reports admin or demo:', reports, '\nadmin?', admin, '\nuid:', uid, '\nteam:', team)
        dispatch(receiveReports(reports, n))
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
        console.log('reports at get reports else:', reports, '\nadmin?', admin, '\nuid:', uid, '\nteam:', team);
        dispatch(receiveReports(reports, n))
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

// export const getTeams = () => {
//
//   return dispatch => {
//     dispatch(setDataProperty({dataIsFresh: false}))
//     dispatch(setDataProperty({loading: true}))
//     return database.ref('teams/')
//             .once('value', snap => {
//       const teams = Object.keys(snap.val())
//                       .filter( t => t !== 'demo' )
//       console.log('teams:', teams);
//       dispatch(setUserProperty({teams,}))
//       dispatch(setDataProperty({loading: false}))
//       dispatch(setDataProperty({dataIsFresh: true}))
//       })
//     .catch( err => {
//       console.error('An error occured while fetching teams from the database:', err);
//       dispatch(setDataError({teamsErr: err}))
//     })
//   }
// }

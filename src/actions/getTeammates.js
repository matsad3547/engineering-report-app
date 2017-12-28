import {  receiveReports,
          setDataProperty,
          setDataError,
        } from './index'

import database from '../utils/firebase'

const getTeammates = () => {

  return (dispatch, getState) => {

    const {
      admin,
      team,
    } = getState().user

    if (admin) {
      return database.ref(`users/`)
              .orderByChild('team')
              .equalTo(team)
              .once('value', snap => {
                const teammates = snap.val()
                console.log('teammates:', teammates);
                // const reports = Object.keys(snap.val())
                //                 .filter( k => k !== '000')
                //                 .reduce( (obj, k) => ({
                //                   ...obj,
                //                   [k]: snap.val()[k]
                //                 }), {})

        // dispatch(receiveReports(reports, n, allReports,))
        dispatch(setDataProperty({loading: false}))
      })
      .catch( err => {
        console.error('An error occured while fetching the list of teammates from the database:', err);
        dispatch(setDataError({teammateErr: err}))
        dispatch(setDataProperty({loading: false}))
      })
    }
  }
}

export default getTeammates

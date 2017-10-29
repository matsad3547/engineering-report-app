import {  setUserProperty,
          setDataProperty,
          setDataError,
        } from './index'

import database from '../utils/firebase'

export const getTeams = () => {

  return dispatch => {

    return database.ref('team_names')
            .once('value', snap => {
      const teams = snap.val()
      dispatch(setUserProperty({teams,}))
      dispatch(setDataProperty({loading: false}))
      })
    .catch( err => {
      console.error('An error occured while fetching teams from the database:', err);
      dispatch(setDataError({teamsErr: err}))
      dispatch(setDataProperty({loading: false}))
    })
  }
}
